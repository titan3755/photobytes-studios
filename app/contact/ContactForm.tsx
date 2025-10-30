'use client';

import { useState, useTransition } from 'react';
import { type Session } from 'next-auth';
import Link from 'next/link';
import { submitContactForm } from '@/app/actions/contactActions';
import Image from 'next/image';

interface ContactFormProps {
  user: Session['user'] | undefined;
}

export function ContactForm({ user }: ContactFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await submitContactForm(formData);
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
      <div className="text-center py-24">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Please Log In
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          You must be logged in to send a contact message.
        </p>
        <Link
          href="/login?callbackUrl=/contact"
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
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center">
          {/* Form UI */}
          <div className="w-full lg:w-[50%] p-5 md:p-10 lg:p-16">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
              Contact Form
            </h2>
            <p className="text-base font-normal text-center text-slate-500 dark:text-slate-400">
              Your name and email are pre-filled. Just type your message below.
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

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 w-full rounded-md p-3 pl-5 border border-slate-500 dark:border-slate-700 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-sans text-base font-medium focus:outline-none"
                  value={user.name || ''}
                  disabled
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
                  name="email"
                  id="email"
                  className="mt-1 w-full rounded-md p-3 pl-5 border border-slate-500 dark:border-slate-700 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-sans text-base font-medium focus:outline-none"
                  value={user.email || ''}
                  disabled
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Your Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Your message..."
                  className="mt-1 w-full rounded-md p-3 pl-5 border border-slate-500 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-sans text-base font-medium focus:outline-2 focus:outline-rose-500"
                  cols={30}
                  rows={8}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="min-w-full mx-auto max-w-sm rounded-lg bg-rose-600 hover:bg-rose-700 p-4 text-center text-xl font-bold text-white my-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'Submitting...' : 'Submit Message'}
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div className="relative w-full h-96 lg:h-[700px] lg:w-[50%] hidden lg:block">
            <Image
              src="https://images.unsplash.com/photo-1528372444006-1bfc81acab02?auto=format&fit=crop&w=435&q=80"
              alt="Contact form decorative image"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}