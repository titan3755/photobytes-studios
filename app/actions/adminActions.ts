'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { OrderStatus, Role, ServiceName, OperationalStatus } from '@prisma/client'; // Add new imports

// --- Reusable Type for Server Action Responses ---
type FormResponse = {
  success: boolean;
  message: string;
};

// --- Reusable Auth Check ---
/**
 * Throws an error if the user is not an ADMIN.
 */
async function checkAdminAuth() {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) {
    throw new Error('Unauthorized: Admin access required.');
  }
  return session; // Return session for convenience
}

// --- Zod Schema for Portfolio Validation ---
const portfolioSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters.' }),
  category: z.string().min(1, { message: 'Category is required.' }),
  imgUrl: z.string().url({ message: 'Must be a valid image URL.' }),
});

// ===================================
// PORTFOLIO ACTIONS
// ===================================
// (Your existing create, update, delete portfolio actions are here)
// ...
export async function createPortfolioItem(
  formData: FormData,
): Promise<FormResponse> {
  try {
    await checkAdminAuth();
    const data = Object.fromEntries(formData.entries());

    // Validate data
    const validated = portfolioSchema.safeParse(data);
    if (!validated.success) {
      return { success: false, message: validated.error.issues[0].message };
    }

    // Create in database
    await prisma.portfolioItem.create({
      data: validated.data,
    });

    revalidatePath('/admin'); // Revalidate admin page
    revalidatePath('/portfolio'); // Revalidate public portfolio page
    return { success: true, message: 'Portfolio item created successfully.' };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function updatePortfolioItem(
  itemId: string,
  formData: FormData,
): Promise<FormResponse> {
  try {
    await checkAdminAuth();
    const data = Object.fromEntries(formData.entries());

    // Validate data
    const validated = portfolioSchema.safeParse(data);
    if (!validated.success) {
      return { success: false, message: validated.error.issues[0].message };
    }

    // Update in database
    await prisma.portfolioItem.update({
      where: { id: itemId },
      data: validated.data,
    });

    revalidatePath('/admin'); // Revalidate admin page
    revalidatePath('/portfolio'); // Revalidate public portfolio page
    return { success: true, message: 'Portfolio item updated successfully.' };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function deletePortfolioItem(itemId: string): Promise<FormResponse> {
  try {
    await checkAdminAuth();

    await prisma.portfolioItem.delete({
      where: { id: itemId },
    });

    revalidatePath('/admin');
    revalidatePath('/portfolio');
    return { success: true, message: 'Portfolio item deleted.' };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

// ===================================
// ORDER ACTIONS
// ===================================
// (Your existing order status action is here)
// ...
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
): Promise<FormResponse> {
  try {
    await checkAdminAuth();

    await prisma.order.update({
      where: { id: orderId },
      data: { status: status },
    });

    revalidatePath('/admin');
    return { success: true, message: 'Order status updated.' };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

// ===================================
// CONTACT MESSAGE ACTIONS
// ===================================
// (Your existing message actions are here)
// ...
export async function markMessageAsRead(messageId: string): Promise<FormResponse> {
  try {
    await checkAdminAuth();

    await prisma.contactMessage.update({
      where: { id: messageId },
      data: { isRead: true },
    });

    revalidatePath('/admin');
    return { success: true, message: 'Message marked as read.' };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function deleteMessage(messageId: string): Promise<FormResponse> {
  try {
    await checkAdminAuth();

    await prisma.contactMessage.delete({
      where: { id: messageId },
    });

    revalidatePath('/admin');
    return { success: true, message: 'Message deleted.' };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

// ===================================
// --- NEW USER ACTIONS ---
// ===================================

/**
 * Updates a user's role.
 */
export async function updateUserRole(
  userId: string,
  role: Role,
): Promise<FormResponse> {
  try {
    const session = await checkAdminAuth();

    // Prevent admin from changing their own role
    if (session.user.id === userId) {
      return { success: false, message: "You cannot change your own role." };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role: role },
    });

    revalidatePath('/admin?tab=users');
    return { success: true, message: 'User role updated.' };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

/**
 * Deletes a user.
 */
export async function deleteUser(userId: string): Promise<FormResponse> {
  try {
    const session = await checkAdminAuth();

    // Prevent admin from deleting themself
    if (session.user.id === userId) {
      return { success: false, message: "You cannot delete your own account." };
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath('/admin?tab=users');
    return { success: true, message: 'User deleted.' };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

// ===================================
// --- NEW SERVICE STATUS ACTIONS ---
// ===================================

export async function updateServiceStatus(
  serviceName: ServiceName,
  status: OperationalStatus,
): Promise<{ success: boolean; message: string }> {
  try {
    await checkAdminAuth(); // Secure the action

    await prisma.serviceStatus.update({
      where: { serviceName },
      data: { status },
    });

    revalidatePath('/admin'); // Revalidate admin page
    revalidatePath('/status'); // Revalidate public status page
    return { success: true, message: 'Status updated successfully.' };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}