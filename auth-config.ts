import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import prisma from '@/lib/prisma';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

// Helper function to check if a value is a valid Role
function isRole(value: unknown): value is Role {
  return Object.values(Role).includes(value as Role);
}

export const authConfig = {
  // We use JWT strategy for Credentials provider
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Fix for 'unknown' type: Add type-checking
        if (
          typeof credentials.email !== 'string' ||
          typeof credentials.password !== 'string'
        ) {
          return null;
        }

        const email = credentials.email;
        const password = credentials.password;

        const user = await prisma.user.findUnique({
          where: { email: email },
        });

        // Check if user exists and has a password (social accounts won't)
        if (!user || !user.password) {
          return null;
        }

        // Compare hashed password
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (passwordsMatch) {
          // Return the full user object to be used in callbacks
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
            username: user.username,
          };
        }

        // If password doesn't match
        return null;
      },
    }),
  ],
  callbacks: {
    /**
     * The 'user' object is only passed on initial sign-in.
     * This callback populates the JWT.
     */
    async jwt({ token, user }) {
      if (user) {
        // On sign-in, user object is available.
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    /**
     * The session callback uses the token to build the session object
     * that is returned to the client.
     */
    async session({ session, token }) {
      // Fix for 'unknown' types: Add safe type-checking
      if (session.user) {
        if (typeof token.id === 'string') {
          session.user.id = token.id;
        }

        if (typeof token.username === 'string' || token.username === null) {
          session.user.username = token.username;
        }

        // Ensure role is a valid Role enum value
        if (isRole(token.role)) {
          session.user.role = token.role;
        } else {
          // Default to USER if token role is invalid
          session.user.role = Role.USER;
        }
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;