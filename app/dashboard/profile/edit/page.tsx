import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { ProfileForm } from './ProfileForm'; // We will create this
import { User } from 'lucide-react';
import Link from 'next/link';

export default async function EditProfilePage() {
  // 1. Get the session on the server
  const session = await auth();

  // 2. If no session, redirect to login
  if (!session?.user?.id) {
    redirect('/login?callbackUrl=/dashboard/profile/edit');
  }

  // 3. Fetch the *latest* user data from the DB
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  // This should not happen if they have a session, but it's a good safeguard
  if (!user) {
    redirect('/login');
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        {/* --- Header --- */}
        <div className="flex items-center gap-4">
          <User className="h-10 w-10 text-rose-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Edit Profile
            </h1>
            <p className="text-base text-gray-500 dark:text-gray-400">
              Update your account details and password.
            </p>
          </div>
        </div>

        {/* --- Render the Client Component with user data --- */}
        <ProfileForm user={user} />

        <div className="text-center">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-rose-600 hover:text-rose-500 dark:text-rose-400 dark:hover:text-rose-300"
          >
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}