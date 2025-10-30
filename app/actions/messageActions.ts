'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';
import { revalidatePath } from 'next/cache';

/**
 * Server Action to send a new message.
 * This is called by both the Admin and the User.
 */
export async function sendMessage(orderId: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: 'Unauthorized.' };
  }

  const content = formData.get('message') as string;
  if (!content || content.trim().length < 1) {
    return { success: false, message: 'Message cannot be empty.' };
  }

  try {
    // 1. Find the order to make sure it exists
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: { authorId: true },
    });

    if (!order) {
      return { success: false, message: 'Order not found.' };
    }

    // 2. Security Check: Ensure the sender is either the order author or an admin
    const isAuthor = session.user.id === order.authorId;
    const isAdmin = session.user.role === Role.ADMIN;

    if (!isAuthor && !isAdmin) {
      return { success: false, message: 'You do not have permission.' };
    }

    // 3. Create the new message and update the order's 'updatedAt' timestamp
    await prisma.$transaction([
      prisma.message.create({
        data: {
          content: content.trim(),
          orderId: orderId,
          senderId: session.user.id,
          // Set read status based on who is sending
          isReadByAdmin: isAdmin,
          isReadByUser: isAuthor,
        },
      }),
      // "Bump" the order so it appears at the top of lists
      prisma.order.update({
        where: { id: orderId },
        data: { updatedAt: new Date() },
      }),
    ]);

    // 4. Revalidate the paths so the new message appears
    // This is CORRECT for sendMessage
    revalidatePath(`/dashboard/orders/${orderId}`);
    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath('/admin');
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error) {
    console.error('Error sending message:', error);
    return { success: false, message: 'An error occurred.' };
  }
}

/**
 * Server Action to mark messages as read.
 */
export async function markMessagesAsRead(orderId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return;
  }

  try {
    // If the user is an admin, mark admin-read messages
    if (session.user.role === Role.ADMIN) {
      await prisma.message.updateMany({
        where: {
          orderId: orderId,
          isReadByAdmin: false,
          senderId: { not: session.user.id }, // Don't mark own messages
        },
        data: { isReadByAdmin: true },
      });
    } else {
      // If the user is a regular user, mark user-read messages
      await prisma.message.updateMany({
        where: {
          orderId: orderId,
          isReadByUser: false,
          senderId: { not: session.user.id },
        },
        data: { isReadByUser: true },
      });
    }

    // --- THIS IS THE FIX ---
    // We MUST remove all revalidatePath calls from this function.
    // This function will now "silently" update the database
    // without triggering a page reload, thus breaking the loop.
    // --- END OF FIX ---
  } catch (error) {
    console.error('Error marking messages as read:', error);
  }
}