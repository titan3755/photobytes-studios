'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { auth } from '@/auth'; // Import your auth config
import { OrderStatus } from '@prisma/client'; // Import the enum

// Define a schema for validation
const orderSchema = z.object({
  category: z.string().min(1, { message: 'Please select a service.' }),
  description: z
    .string()
    .min(20, { message: 'Description must be at least 20 characters long.' }),
  budget: z.string().optional(), // Budget is optional
  deadline: z.string().optional(), // Deadline is optional
});

export async function submitOrderForm(formData: FormData) {
  // 1. Get user session
  const session = await auth();

  // 2. Check if user is logged in
  if (!session?.user?.id) {
    return {
      success: false,
      message: 'Unauthorized: You must be logged in to place an order.',
    };
  }

  // 3. Validate form data
  const validated = orderSchema.safeParse({
    category: formData.get('category'),
    description: formData.get('description'),
    budget: formData.get('budget'),
    deadline: formData.get('deadline'),
  });

  if (!validated.success) {
    return { success: false, message: validated.error.issues[0].message };
  }

  const { category, description, budget, deadline } = validated.data;

  // 4. Save to database
  try {
    await prisma.order.create({
      data: {
        category,
        description,
        budget,
        deadline,
        status: OrderStatus.PENDING, // Use the imported enum
        authorId: session.user.id, // Link the order to the logged-in user
      },
    });

    return { success: true, message: 'Your order has been submitted!' };
  } catch (error) {
    console.error('Error saving order:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }
}