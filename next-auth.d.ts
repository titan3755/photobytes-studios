import { Role } from '@prisma/client';
import { type DefaultSession, type User } from 'next-auth';
import { type AdapterUser } from '@auth/core/adapters';
import { type JWT } from '@auth/core/jwt';

/**
 * Extends the built-in session.user object.
 */
declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      role: Role;
      username?: string | null;
    };
  }

  /**
   * Extends the built-in user object.
   */
  interface User {
    role: Role;
    username?: string | null;
  }
}

/**
 * Extends the AdapterUser object to include our custom 'role' and 'username'.
 * This is crucial for fixing the type mismatch with PrismaAdapter.
 */
declare module '@auth/core/adapters' {
  interface AdapterUser extends User {
    role: Role;
    username?: string | null;
  }
}

/**
 * Extends the JWT object to include our custom fields.
 * Note: Use '@auth/core/jwt' for Auth.js v5
 */
declare module '@auth/core/jwt' {
  interface JWT {
    role: Role;
    id: string;
    username?: string | null;
  }
}
