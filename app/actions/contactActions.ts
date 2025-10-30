'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { headers } from 'next/headers'; // Import 'headers' to get the IP

// Define a schema for validation
const contactSchema = z.object({
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters long.' }),
});

export async function submitContactForm(formData: FormData) {
  try {
    // 1. Get user's IP Address
    // --- THIS IS THE FIX ---
    // Added 'await' before headers()
    const headersList = await headers();
    // --- END OF FIX ---
    const ipAddress = (headersList.get('x-forwarded-for') ?? '127.0.0.1').split(
      ',',
    )[0];

    // 2. Get user session
    const session = await auth();

    // 3. Check if user is logged in
    if (!session?.user?.id || !session.user.name || !session.user.email) {
      return {
        success: false,
        message: 'Unauthorized: You must be logged in to send a message.',
      };
    }

    // 4. Check for Rate Limiting (1 hour)
    const oneHourAgo = new Date(Date.now() - 1000 * 60 * 60);
    const lastMessage = await prisma.contactMessage.findFirst({
      where: {
        ipAddress: ipAddress,
        createdAt: {
          gte: oneHourAgo, // Find any message from this IP in the last hour
        },
      },
    });

    if (lastMessage) {
      // If a message was found, block the request
      return {
        success: false,
        message:
          'You are sending messages too frequently. Please wait at least one hour.',
      };
    }

    // 5. Validate form data
    const validated = contactSchema.safeParse({
      message: formData.get('message'),
    });

    if (!validated.success) {
      return { success: false, message: validated.error.issues[0].message };
    }

    // 6. Save to database (now including the IP address)
    await prisma.contactMessage.create({
      data: {
        name: session.user.name,
        email: session.user.email,
        message: validated.data.message,
        ipAddress: ipAddress, // Store the IP address
      },
    });

    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Error saving contact message:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }
}