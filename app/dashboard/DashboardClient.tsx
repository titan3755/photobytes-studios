'use client';

import { useState, useTransition } from 'react';
import { type Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { deleteUserAccount } from '@/app/actions/userActions';
import { Role } from '@prisma/client';
import { User, Mail, Shield, Edit, Trash2, Loader2 } from 'lucide-react';

// Helper component for the user's avatar
function UserAvatar({
  user,
}: {
  user: { name?: string | null; image?: string | null };
}) {
  if (user.image) {
    return (
      <Image
        className="h-24 w-24 rounded-full object-cover ring-4 ring-white dark:ring-gray-800"
        src={user.image}
        alt={user.name || 'User avatar'}
        width={96}
        height={96}
        referrerPolicy="no-referrer"
      />
    );
  }
  
  // Fallback initials
  const initials = user.name
    ? (user.name.split(' ')[0][0] + (user.name.split(' ')[1]?.[0] || ''))
    : '?';

  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-rose-500 font-semibold text-white ring-4 ring-white dark:ring-gray-800 text-3xl">
      {initials.toUpperCase()}
    </div>
  );
}

// Helper for displaying info
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="flex items-center gap-4">
      <Icon className="h-5 w-5 text-gray-400" />
      <div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {label}
        </span>
        <p className="text-base font-semibold text-gray-900 dark:text-white">
          {value || 'Not set'}
        </p>
      </div>
    </div>
  );
}

export default function DashboardClient({
  user,
}: {
  user: Session['user'];
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (
      !confirm(
        'Are you absolutely sure? This action cannot be undone and will permanently delete your account and all associated data.',
      )
    ) {
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await deleteUserAccount();
      if (!result.success) {
        setError(result.message);
      }
      // No need to handle success, as the user will be signed out and redirected.
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      {/* --- Header Card --- */}
      <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="h-32 bg-gray-100 dark:bg-gray-700" />
        <div className="absolute top-16 left-8">
          <UserAvatar user={user} />
        </div>
        <div className="px-8 pt-16 pb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {user.name || 'Welcome'}
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400">
            Welcome to your dashboard.
          </p>
        </div>
      </div>

      {/* --- Account Details Card --- */}
      <div className="rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Account Details
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <InfoRow icon={User} label="Username" value={user.username} />
          <InfoRow icon={Mail} label="Email Address" value={user.email} />
          <InfoRow icon={Shield} label="Account Role" value={user.role} />
        </div>
      </div>

      {/* --- Settings & Actions Card --- */}
      <div className="rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Settings
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <Link
            href="/dashboard/profile/edit"
            className="flex w-full items-center justify-between rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Edit Profile
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Update your name, username, and other details.
              </p>
            </div>
            <Edit className="h-5 w-5 text-gray-400" />
          </Link>
        </div>
      </div>

      {/* --- Danger Zone --- */}
      <div className="rounded-lg bg-red-50 dark:bg-red-900/50 border border-red-400 dark:border-red-700">
        <div className="px-6 py-4">
          <h3 className="text-lg font-medium text-red-900 dark:text-red-200">
            Danger Zone
          </h3>
        </div>
        <div className="p-6 border-t border-red-300 dark:border-red-700">
          {error && (
            <div className="mb-4 text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-red-800 dark:text-red-200">
                Delete Your Account
              </p>
              <p className="text-sm text-red-700 dark:text-red-300">
                This action is permanent and cannot be undone.
              </p>
            </div>
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="mt-4 sm:mt-0 sm:ml-6 inline-flex items-center gap-2 justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              {isPending ? 'Deleting...' : 'Delete Account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}