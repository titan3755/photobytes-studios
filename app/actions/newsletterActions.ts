'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// 1. Define a schema for email validation
const emailSchema = z
  .string()
  .email({ message: 'Please enter a valid email address.' });

export async function subscribeToNewsletter(formData: FormData) {
  try {
    // --- START: reCAPTCHA Verification ---
    const token = formData.get('recaptchaToken') as string;
    if (!token) {
      return { success: false, message: 'reCAPTCHA token missing.' };
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    
    const recaptchaResponse = await fetch(verifyUrl, { method: 'POST' });
    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return { success: false, message: 'reCAPTCHA verification failed.' };
    }

    // Optional: Check the score. 0.5 is a common threshold.
    if (recaptchaData.score < 0.5) {
      return { success: false, message: 'Bot-like behavior detected.' };
    }
    // --- END: reCAPTCHA Verification ---

    const email = formData.get('email') as string;

    // 2. Validate the email
    const validated = emailSchema.safeParse(email);
    if (!validated.success) {
      return { success: false, message: validated.error.issues[0].message };
    }

    // 3. Check if the user is already subscribed
    const existingSubscriber = await prisma.newsletterSubscription.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return {
        success: false,
        message: 'You are already subscribed to our newsletter!',
      };
    }

    // 4. Save the new subscriber to the database
    await prisma.newsletterSubscription.create({
      data: {
        email,
      },
    });

    revalidatePath('/');
    return { success: true, message: 'Thanks for subscribing!' };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'An internal error occurred. Please try again.',
    };
  }
}