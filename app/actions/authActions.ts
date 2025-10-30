'use server';

import prisma from '@/lib/prisma';
import * as bcrypt from 'bcrypt';
import { z } from 'zod';

// Define a schema for registration validation
const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function registerUser(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    
    // --- 1. Verify reCAPTCHA token ---
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

    // Optional: Check the score. 0.5 is a common threshold for v3.
    if (recaptchaData.score < 0.5) {
      return { success: false, message: 'Bot-like behavior detected. Please try again.' };
    }
    // --- End reCAPTCHA verification ---


    // 2. Validate the form data
    const validated = registerSchema.safeParse(data);
    if (!validated.success) {
      return { success: false, message: validated.error.issues[0].message };
    }

    const { email, username, password } = validated.data;

    // 3. Check if user already exists (by email or username)
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUserByEmail) {
      return { success: false, message: 'User with this email already exists.' };
    }
    const existingUserByUsername = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUserByUsername) {
      return { success: false, message: 'Username is already taken.' };
    }

    // 4. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create the new user in the database
    await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    return { success: true, message: 'Registration successful! Please log in.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An unknown error occurred.' };
  }
}