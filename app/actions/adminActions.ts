'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { OrderStatus, Role } from '@prisma/client';

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

/**
 * Creates a new portfolio item.
 */
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

/**
 * Updates an existing portfolio item.
 */
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

/**
 * Deletes a portfolio item.
 */
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

/**
 * Updates the status of an order.
 */
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

/**
 * Marks a contact message as read.
 */
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

/**
 * Deletes a contact message.
 */
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