'use server';

import { auth, signOut } from '@/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

// Reusable type for Server Action Responses
type ActionResponse = {
  success: boolean;
  message: string;
};

// --- Profile Update Schema ---
const profileSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters.' }),
});

// --- Password Update Schema ---
const passwordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, { message: 'Current password is required.' }),
  newPassword: z
    .string()
    .min(8, { message: 'New password must be at least 8 characters.' }),
});

// --- FUNCTION 1: Update Profile Info ---
export async function updateUserProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: 'Unauthorized.' };
  }

  const data = Object.fromEntries(formData.entries());

  // Validate data
  const validated = profileSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, message: validated.error.issues[0].message };
  }

  const { name, username } = validated.data;

  try {
    // Check if new username is already taken by *another* user
    const existingUser = await prisma.user.findFirst({
      where: {
        username: username,
        id: { not: session.user.id }, // Check all users *except* this one
      },
    });

    if (existingUser) {
      return { success: false, message: 'Username is already taken.' };
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        username,
      },
    });

    revalidatePath('/dashboard'); // Re-fetch data on dashboard
    revalidatePath('/dashboard/profile/edit'); // Re-fetch data on this page
    
    // Return the updated user data
    return {
      success: true,
      message: 'Profile updated successfully!',
      user: updatedUser, // This is the new part
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An error occurred.' };
  }
}

// --- FUNCTION 2: Update Password ---
export async function updateUserPassword(
  formData: FormData,
): Promise<ActionResponse> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: 'Unauthorized.' };
  }

  const data = Object.fromEntries(formData.entries());

  // Validate data
  const validated = passwordSchema.safeParse(data);
  if (!validated.success) {
    return { success: false, message: validated.error.issues[0].message };
  }

  const { currentPassword, newPassword } = validated.data;

  try {
    // Get the user's current hashed password
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    // Check if user (somehow) doesn't have a password (e.g., social login)
    if (!user?.password) {
      return {
        success: false,
        message:
          'You do not have a password set up. (Did you sign in with Google/Facebook?)',
      };
    }

    // Compare current password with the one in the DB
    const passwordsMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordsMatch) {
      return { success: false, message: 'Incorrect current password.' };
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        password: hashedNewPassword,
      },
    });

    return { success: true, message: 'Password updated successfully!' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An error occurred.' };
  }
}

// --- FUNCTION 3: Delete Account ---
export async function deleteUserAccount(): Promise<ActionResponse> {
  // 1. Get the current session
  const session = await auth();

  // 2. Ensure user is logged in
  if (!session?.user?.id) {
    return { success: false, message: 'Unauthorized.' };
  }

  const userId = session.user.id;

  try {
    // 3. Delete the user from the database
    // Your Prisma schema is set to 'onDelete: Cascade',
    // so this will also delete their related Accounts, Sessions, Orders, etc.
    await prisma.user.delete({
      where: { id: userId },
    });

    // 4. Revalidate paths
    revalidatePath('/');
    
  } catch (error) {
    console.error('Failed to delete user:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }

  // 5. Sign the user out (this must be called *outside* the try/catch)
  await signOut({ redirectTo: '/' });

  return { success: true, message: 'Account deleted successfully.' };
}