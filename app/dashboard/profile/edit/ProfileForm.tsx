'use client';

import { useState, useTransition } from 'react';
import { type User } from '@prisma/client';
import {
  updateUserProfile,
  updateUserPassword,
} from '@/app/actions/userActions';
import { Loader2 } from 'lucide-react';

interface ProfileFormProps {
  user: User;
}

// Reusable component for form success/error messages
function FormStatus({
  type,
  message,
}: {
  type: 'success' | 'error';
  message: string;
}) {
  const classes =
    type === 'success'
      ? 'border-green-400 bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300'
      : 'border-red-400 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300';
  return (
    <div
      className={`mt-4 rounded-md border p-3 ${classes}`}
      role={type === 'error' ? 'alert' : 'status'}
    >
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

export function ProfileForm({ user }: ProfileFormProps) {
  // States for the profile info form
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [isProfilePending, startProfileTransition] = useTransition();

  // States for the password form
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [isPasswordPending, startPasswordTransition] = useTransition();

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileError(null);
    setProfileSuccess(null);

    const formData = new FormData(e.currentTarget);

    startProfileTransition(async () => {
      const result = await updateUserProfile(formData);
      if (result.success) {
        setProfileSuccess(result.message);
      } else {
        setProfileError(result.message);
      }
    });
  };

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    // Client-side validation
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    startPasswordTransition(async () => {
      const result = await updateUserPassword(formData);
      if (result.success) {
        setPasswordSuccess(result.message);
        (e.target as HTMLFormElement).reset(); // Reset form on success
      } else {
        setPasswordError(result.message);
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* --- Profile Information Card --- */}
      <div className="rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Profile Information
          </h3>
        </div>
        <form onSubmit={handleProfileUpdate} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={user.username || ''}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={user.name || ''}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email || 'No email provided'}
              disabled
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-500 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 sm:text-sm"
            />
            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
              Email address cannot be changed.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3">
            {profileSuccess && (
              <FormStatus type="success" message={profileSuccess} />
            )}
            {profileError && <FormStatus type="error" message={profileError} />}
            <button
              type="submit"
              disabled={isProfilePending}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isProfilePending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isProfilePending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* --- Change Password Card --- */}
      {/* Only show if the user has a password (i.e., not a social login) */}
      {user.password && (
        <div className="rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Change Password
            </h3>
          </div>
          <form onSubmit={handlePasswordUpdate} className="p-6 space-y-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                minLength={8}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                minLength={8}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center justify-end gap-3">
              {passwordSuccess && (
                <FormStatus type="success" message={passwordSuccess} />
              )}
              {passwordError && (
                <FormStatus type="error" message={passwordError} />
              )}
              <button
                type="submit"
                disabled={isPasswordPending}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPasswordPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isPasswordPending ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}