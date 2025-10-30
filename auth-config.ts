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

        if (!user || !user.password) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (passwordsMatch) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
            username: user.username,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    /**
     * The 'user' object is passed on initial sign-in.
     * The 'trigger' and 'session' objects are passed on update().
     */
    async jwt({ token, user, trigger, session }) {
      // 1. On initial sign-in (when 'user' object is present)
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }

      // 2. On session update (e.g., user updates profile)
      if (trigger === 'update' && session) {
        // 'session' contains the data passed to update()
        if (session.name) {
          token.name = session.name as string;
        }
        if (session.username) {
          token.username = session.username as string;
        }
      }

      return token;
    },

    /**
     * The session callback maps data from the JWT (token)
     * to the client-side session object.
     */
    async session({ session, token }) {
      if (session.user) {
        // --- THIS IS THE FIX ---
        // We must safely check the types of the token properties
        
        if (typeof token.id === 'string') {
          session.user.id = token.id;
        }
        
        if (typeof token.email === 'string') {
          session.user.email = token.email;
        }
        
        if (typeof token.name === 'string' || token.name === null) {
          session.user.name = token.name;
        }

        if (typeof token.image === 'string' || token.image === null) {
          session.user.image = token.image;
        }
        
        if (typeof token.username === 'string' || token.username === null) {
          session.user.username = token.username;
        }
        
        if (isRole(token.role)) {
          session.user.role = token.role;
        } else {
          session.user.role = Role.USER; // Default fallback
        }
        // --- END OF FIX ---
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;