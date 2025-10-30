'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import PortfolioForm from './PortfolioForm'; // Import the form

export function CreatePortfolioButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center gap-x-2 rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-700 transition-colors"
      >
        <Plus className="-ml-0.5 h-5 w-5" />
        Add New Item
      </button>

      {/* --- Create Modal --- */}
      {isModalOpen && (
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
                Create New Portfolio Item
              </h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setIsModalOpen(false)}
              >
                <span className="sr-only">Close</span>
                &times;
              </button>
            </div>
            <div className="mt-4">
              <PortfolioForm
                onFormSubmitted={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}