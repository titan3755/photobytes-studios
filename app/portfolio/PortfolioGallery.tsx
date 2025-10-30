'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { PortfolioItem } from '@prisma/client'; // Import the type

interface PortfolioGalleryProps {
  items: PortfolioItem[]; // Receive the items as a prop
}

const categories = [
  'All',
  'Web Design',
  'GFX',
  'Motion GFX',
  'Software Development',
  'Other',
];

export function PortfolioGallery({ items }: PortfolioGalleryProps) {
  const [filter, setFilter] = useState('All');

  // --- START: MODIFIED FILTER ---
  // This filter is robust against case and whitespace
  const filteredItems =
    filter === 'All'
      ? items
      : items.filter(
          (item) =>
            item.category.trim().toLowerCase() === filter.toLowerCase(),
        );
  // --- END: MODIFIED FILTER ---

  const getCategoryClass = (category: string) => {
    // --- START: MODIFIED SWITCH ---
    // This switch is now robust against case and whitespace
    switch (category.trim().toLowerCase()) {
      case 'web design':
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/50';
      case 'gfx':
        return 'border-red-500 bg-red-50 dark:bg-red-900/50';
      case 'motion gfx':
        return 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/50';
      case 'software development':
        return 'border-purple-500 bg-purple-50 dark:bg-purple-900/50';
      case 'other':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/50';
      default:
        return 'border-gray-300 bg-gray-50 dark:bg-gray-700/50';
    }
    // --- END: MODIFIED SWITCH ---
  };

  return (
    <div className="container mx-auto max-w-7xl px-6 lg:px-8 py-20">
      {/* Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              filter === category
                ? 'bg-rose-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-transform hover:scale-105"
          >
            <div className="relative w-full h-60">
              <Image
                src={item.imgUrl}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div
              className={`p-6 border-t-4 h-full ${getCategoryClass(item.category)}`}
            >
              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2 ${getCategoryClass(
                  item.category,
                )} text-gray-800 dark:text-gray-100`}
              >
                {item.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            No Projects Found
          </h3>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            There are no projects in this category yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}