import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-white dark:bg-gray-900 py-24 px-6 sm:py-32 lg:px-8">
      {/* 160px is an estimate for your sticky navbar + footer height */}
      
      <div className="text-center">
        <p className="text-9xl font-semibold text-rose-600 dark:text-rose-500">
          <Lock className="inline-block h-24 w-24" />
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Access Denied
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
          Sorry, you do not have permission to access this page.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="inline-flex items-center gap-x-2 rounded-md bg-rose-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-rose-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
          >
            <ArrowLeft className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Go back home
          </Link>
          <Link
            href="/contact"
            className="text-base font-semibold text-gray-900 dark:text-white"
          >
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}