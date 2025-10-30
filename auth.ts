import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import { authConfig } from './auth-config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  /**
   * This adapter line will **ONLY** work after you have
   * fixed your npm packages as described at the top.
   */
  adapter: PrismaAdapter(prisma),
});

