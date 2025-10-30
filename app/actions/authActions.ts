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

    // 1. Validate the form data
    const validated = registerSchema.safeParse(data);
    if (!validated.success) {
      // --- THIS IS THE FIX ---
      // Use .issues[0].message instead of .errors[0].message
      return { success: false, message: validated.error.issues[0].message };
      // --- END OF FIX ---
    }

    const { email, username, password } = validated.data;

    // 2. Check if user already exists (by email or username)
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

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create the new user in the database
    // Your schema automatically defaults 'role' to 'USER'
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