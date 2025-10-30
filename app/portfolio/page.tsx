import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import prisma from '@/lib/prisma'; // Import Prisma
import { PortfolioGallery } from './PortfolioGallery'; // Import the new client component

// --- 1. Hero Section ---
function Hero() {
  return (
    <div className="relative h-[500px] lg:h-[700px] w-full">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&w=1600&q=80"
        alt="Our Portfolio"
        layout="fill"
        objectFit="cover"
        className="brightness-50"
        priority
      />
      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Our Work
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-200 max-w-2xl mx-auto">
          We take pride in our work. Browse our curated collection of
          projects, from stunning websites to eye-catching graphics and
          animations.
        </p>
      </div>
    </div>
  );
}

// --- 2. CTA Section ---
function CtaSection() {
  return (
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
  );
}

// --- Main Portfolio Page (Server Component) ---
export default async function PortfolioPage() {
  // 1. Fetch all portfolio items from the database
  const items = await prisma.portfolioItem.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  // 2. Render the static parts and pass the data to the client component
  return (
    <main className="bg-white dark:bg-gray-900">
      <Hero />
      <PortfolioGallery items={items} />
      <CtaSection />
    </main>
  );
}