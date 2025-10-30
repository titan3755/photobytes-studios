'use client';

import { useState, useTransition } from 'react';
import { subscribeToNewsletter } from '@/app/actions/newsletterActions';
import { Loader2 } from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

// ... (your FormStatus component) ...
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
      className={`mt-4 rounded-md border p-3 text-center text-sm font-medium ${classes}`}
      role={type === 'error' ? 'alert' : 'status'}
    >
      <p>{message}</p>
    </div>
  );
}


// --- START: Add userEmail prop ---
export function Newsletter({ userEmail }: { userEmail?: string | null }) {
// --- END: Add userEmail prop ---

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!executeRecaptcha) {
      setError('reCAPTCHA not loaded. Please try refreshing.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;

    startTransition(async () => {
      try {
        const token = await executeRecaptcha('newsletter_signup');
        formData.append('recaptchaToken', token);
        
        const result = await subscribeToNewsletter(formData);
        if (result.success) {
          setSuccess(result.message);
          if (!userEmail) {
             // Only reset the form if the user is not logged in
            form.reset();
          }
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('reCAPTCHA verification failed. Please try again.');
      }
    });
  };

  return (
    <div className="w-full p-10 bg-slate-100 dark:bg-gray-800">
      <div className="container mx-auto max-w-3xl flex flex-col items-center justify-center">
        <h2 className="text-center mx-auto text-4xl md:text-5xl font-bold md:font-extrabold text-black dark:text-white mt-10">
          Subscribe to our newsletter!
        </h2>
        <p className="text-center mx-auto text-base md:text-lg font-normal text-slate-500 dark:text-slate-400 my-4">
          Want to receive news about our products? You can subscribe to our
          newsletter!
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center mt-6 mb-10 w-full max-w-md"
        >
          <input
            type="email"
            name="email"
            className="w-full sm:w-[300px] border-2 text-black dark:text-white border-black dark:border-gray-500 bg-white dark:bg-gray-700 p-3 rounded-md sm:rounded-l-md sm:rounded-r-none"
            placeholder="Your email address"
            required
            disabled={isPending}          // Only disable while submitting
            readOnly={!!userEmail}       // Make it read-only if pre-filled
            defaultValue={userEmail || ''} // Set default value
          />
          <button
            type="submit"
            disabled={isPending || !!success} // Disable after success
            className="p-3 w-full sm:w-[100px] rounded-md sm:rounded-r-md sm:rounded-l-none bg-black dark:bg-gray-600 text-white font-medium mt-2 sm:mt-0 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 mx-auto animate-spin" />
            ) : (
              'Submit'
            )}
          </button>
        </form>

        {success && <FormStatus type="success" message={success} />}
        {error && <FormStatus type="error" message={error} />}
      </div>
    </div>
  );
}