'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// --- Mock Data for Portfolio Items ---
const portfolioItems = [
  {
    id: 1,
    title: 'Modern E-Commerce Site',
    category: 'Web Design',
    imgUrl: 'https://placehold.co/600x400/3b82f6/white?text=Web+Project',
    description: 'A full-stack e-commerce solution built with Next.js.',
  },
  {
    id: 2,
    title: 'Corporate Branding Package',
    category: 'GFX',
    imgUrl: 'https://placehold.co/600x400/ef4444/white?text=GFX+Project',
    description: 'Logo, business cards, and brand guidelines.',
  },
  {
    id: 3,
    title: 'Product Explainer Video',
    category: 'Motion GFX',
    imgUrl: 'https://placehold.co/600x400/10b981/white?text=Motion+Project',
    description: 'An animated video for a new SaaS product.',
  },
  {
    id: 4,
    title: 'Portfolio Website',
    category: 'Web Design',
    imgUrl: 'https://placehold.co/600x400/3b82f6/white?text=Web+Project+2',
    description: 'A sleek, personal portfolio for a photographer.',
  },
  {
    id: 5,
    title: 'Social Media Ad Campaign',
    category: 'GFX',
    imgUrl: 'https://placehold.co/600x400/ef4444/white?text=GFX+Project+2',
    description: 'A series of graphics for an Instagram campaign.',
  },
  {
    id: 6,
    title: 'Logo Animation',
    category: 'Motion GFX',
    imgUrl: 'https://placehold.co/600x400/10b981/white?text=Motion+Project+2',
    description: 'A dynamic intro animation for a YouTube channel.',
  },
];

const categories = ['All', 'Web Design', 'GFX', 'Motion GFX'];

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');

  const filteredItems =
    filter === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === filter);

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'Web Design':
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/50';
      case 'GFX':
        return 'border-red-500 bg-red-50 dark:bg-red-900/50';
      case 'Motion GFX':
        return 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/50';
      default:
        return 'border-gray-300';
    }
  };

  return (
    <main className="bg-white dark:bg-gray-900">
      {/* --- 1. Hero Section --- */}
      <div className="relative bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Our Work
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We take pride in our work. Browse our curated collection of
            projects, from stunning websites to eye-catching graphics and
            animations.
          </p>
        </div>
      </div>

      {/* --- 2. Filter & Gallery Section --- */}
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
                className={`p-6 border-t-4 ${getCategoryClass(item.category)}`}
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

      {/* --- 3. CTA Section --- */}
      <div className="bg-slate-100 dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl py-24 px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Have a project in mind?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Let's turn your idea into reality. We're here to help you build
            something amazing.
          </p>
          <div className="mt-10">
            <Link
              href="/order"
              className="inline-flex items-center gap-x-2 rounded-md bg-rose-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-rose-700 transition-colors"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}