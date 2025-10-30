'use client';

import { useState, useTransition } from 'react';
import { type Session } from 'next-auth';
import Link from 'next/link';
import { submitOrderForm } from '@/app/actions/orderActions';

interface OrderFormProps {
  user: Session['user'] | undefined;
}

export function OrderForm({ user }: OrderFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await submitOrderForm(formData);
      if (result.success) {
        setSuccess(result.message);
        (e.target as HTMLFormElement).reset(); // Reset form on success
      } else {
        setError(result.message);
      }
    });
  };

  // If user is NOT logged in
  if (!user) {
    return (
      <div className="text-center py-24 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Please Log In
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          You must be logged in to place an order.
        </p>
        <Link
          href="/login?callbackUrl=/order"
          className="mt-8 inline-block rounded-md bg-rose-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-rose-700"
        >
          Login
        </Link>
      </div>
    );
  }

  // If user IS logged in
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl p-5 my-5">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full lg:w-3/4 p-5 md:p-10 lg:p-16">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
              Order Details
            </h2>
            <p className="text-base font-normal text-center text-slate-500 dark:text-slate-400">
              Your name and email are pre-filled from your account. Please
              provide the details of your project.
            </p>

            {/* Error Message */}
            {error && (
              <div
                className="mt-6 rounded-md border border-red-400 bg-red-50 p-3 dark:bg-red-900/50"
                role="alert"
              >
                <p className="text-sm font-medium text-red-700 dark:text-red-300">
                  {error}
                </p>
              </div>
            )}
            {/* Success Message */}
            {success && (
              <div
                className="mt-6 rounded-md border border-green-400 bg-green-50 p-3 dark:bg-green-900/50"
                role="alert"
              >
                <p className="text-sm font-medium text-green-700 dark:text-green-300">
                  {success}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              {/* Name and Email (Disabled) */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-md p-3 pl-5 border border-slate-500 dark:border-slate-700 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-sans text-base font-medium focus:outline-none"
                    value={user.name || ''}
                    disabled
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-md p-3 pl-5 border border-slate-500 dark:border-slate-700 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-sans text-base font-medium focus:outline-none"
                    value={user.email || ''}
                    disabled
                  />
                </div>
              </div>

              {/* Service Type */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  What service do you need?
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full rounded-md p-3 pl-4 border border-slate-500 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-sans text-base font-medium focus:outline-2 focus:outline-rose-500"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service...
                  </option>
                  <option value="GFX Design">GFX Design</option>
                  <option value="Motion GFX">Motion GFX</option>
                  <option value="Web Design">Web Design</option>
                  <option value="Writing Services">Writing Services</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Optional Fields: Budget and Deadline */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full">
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Budget (Optional)
                  </label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    className="w-full rounded-md p-3 pl-5 border border-slate-500 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-sans text-base font-medium focus:outline-2 focus:outline-rose-500"
                    placeholder="e.g., $500"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="deadline"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Deadline (Optional)
                  </label>
                  <input
                    type="text"
                    id="deadline"
                    name="deadline"
                    className="w-full rounded-md p-3 pl-5 border border-slate-500 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-sans text-base font-medium focus:outline-2 focus:outline-rose-500"
                    placeholder="e.g., 'In 2 weeks'"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Project Details
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Please describe your project. Include any relevant details, links, or specific requirements."
                  className="w-full rounded-md p-3 pl-5 border border-slate-500 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-sans text-base font-medium focus:outline-2 focus:outline-rose-500"
                  cols={30}
                  rows={10}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="min-w-full mx-auto max-w-md rounded-lg bg-rose-600 p-4 text-center text-xl font-bold text-white my-4 transition-colors hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'Submitting Order...' : 'Submit Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}