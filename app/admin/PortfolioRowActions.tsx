'use client';

import { useState, useTransition } from 'react';
import { deletePortfolioItem } from '@/app/actions/adminActions';
import { toast } from 'sonner';
import { Edit, Trash2 } from 'lucide-react';
import { type PortfolioItem } from '@prisma/client';
import PortfolioForm from './PortfolioForm'; // Import the form

export default function PortfolioRowActions({
  item,
}: {
  item: PortfolioItem;
}) {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false); // State to control the modal

  const handleDelete = () => {
    if (
      !confirm(
        `Are you sure you want to delete "${item.title}"? This action is permanent.`,
      )
    ) {
      return;
    }
    startTransition(async () => {
      const result = await deletePortfolioItem(item.id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={() => setIsEditing(true)}
          disabled={isPending}
          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50"
          title="Edit Item"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
          title="Delete Item"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* --- Edit Modal --- */}
      {isEditing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
            <div className="flex items-start justify-between">
              <h2
                id="modal-title"
                className="text-lg font-medium text-gray-900 dark:text-white"
              >
                Edit Portfolio Item
              </h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setIsEditing(false)}
              >
                <span className="sr-only">Close</span>
                &times;
              </button>
            </div>
            <div className="mt-4">
              <PortfolioForm
                itemToEdit={item}
                onFormSubmitted={() => setIsEditing(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}