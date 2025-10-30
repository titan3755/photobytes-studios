'use client';

import { useState, useTransition } from 'react';
import {
  createPortfolioItem,
  updatePortfolioItem,
} from '@/app/actions/adminActions';
import type { PortfolioItem } from '@prisma/client';

interface PortfolioFormProps {
  itemToEdit?: PortfolioItem | null;
  onFormSubmitted: () => void; // Function to close the modal on success
}

export default function PortfolioForm({
  itemToEdit,
  onFormSubmitted,
}: PortfolioFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const action = itemToEdit
        ? updatePortfolioItem(itemToEdit.id, formData) // Call update action
        : createPortfolioItem(formData); // Call create action
      
      const result = await action;

      if (result.success) {
        setSuccess(result.message);
        onFormSubmitted(); // Close modal/clear form
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Error Message */}
      {error && (
        <div
          className="rounded-md border border-red-400 bg-red-50 p-3 dark:bg-red-900/50"
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
          className="rounded-md border border-green-400 bg-green-50 p-3 dark:bg-green-900/50"
          role="alert"
        >
          <p className="text-sm font-medium text-green-700 dark:text-green-300">
            {success}
          </p>
        </div>
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={itemToEdit?.title || ''}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          defaultValue={itemToEdit?.category || ''}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="Web Design">Web Design</option>
          <option value="GFX">GFX</option>
          <option value="Motion GFX">Motion GFX</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="imgUrl"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Image URL
        </label>
        <input
          type="url"
          id="imgUrl"
          name="imgUrl"
          defaultValue={itemToEdit?.imgUrl || ''}
          placeholder="https://images.unsplash.com/..."
          required
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={itemToEdit?.description || ''}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 sm:text-sm"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onFormSubmitted}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? 'Saving...'
            : itemToEdit
            ? 'Update Item'
            : 'Create Item'}
        </button>
      </div>
    </form>
  );
}