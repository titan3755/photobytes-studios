'use client'; // This file must be a Client Component

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import './globals.css'; // Import globals to get Tailwind and dark mode

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      {/* We must add the bg-white dark:bg-gray-900 classes here 
        because the root layout is not being rendered.
      */}
      <body className="bg-white dark:bg-gray-900">
        <main className="flex min-h-screen items-center justify-center py-24 px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-9xl font-semibold text-rose-600 dark:text-rose-500">
              <AlertTriangle className="inline-block h-24 w-24" />
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Something went wrong
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
              Sorry, an unexpected error occurred. Please try again.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <button
                onClick={() => reset()}
                className="inline-flex items-center gap-x-2 rounded-md bg-rose-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-rose-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="-ml-0.5 h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                Try again
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-x-2 text-base font-semibold text-gray-900 dark:text-white"
              >
                <ArrowLeft className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
