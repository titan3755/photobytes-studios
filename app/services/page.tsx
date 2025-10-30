import Link from 'next/link';
import {
  Palette,
  Monitor,
  Film,
  Feather,
  ArrowRight,
  Check,
} from 'lucide-react';
import Image from 'next/image'; // Added Image import

// --- Mock Data for Services ---
const services = [
  {
    icon: Palette,
    title: 'GFX Design',
    description:
      'From a memorable logo to a complete brand identity, we craft high-quality graphics that make you stand out. We cover branding, marketing materials, social media graphics, and more.',
    features: [
      'Logo Design & Branding',
      'Marketing & Ad Creatives',
      'Social Media Kits',
      'Business Cards & Stationery',
    ],
    color: 'text-red-500',
  },
  {
    icon: Monitor,
    title: 'Web Design & Development',
    description:
      'We build modern, responsive, and blazing-fast websites using the latest technologies. Whether you need a simple portfolio or a full-stack web application, we have you covered.',
    features: [
      'Custom Web Design',
      'Next.js & React Development',
      'Responsive & Mobile-First',
      'E-Commerce Solutions',
    ],
    color: 'text-blue-500',
  },
  {
    icon: Film,
    title: 'Motion GFX',
    description:
      'Bring your brand to life with engaging motion graphics. We create everything from animated logos and explainer videos to dynamic intros and social media video content.',
    features: [
      'Animated Explainer Videos',
      'Logo & Title Animations',
      'Social Media Video Ads',
      'Video Editing & Post-Production',
    ],
    color: 'text-emerald-500',
  },
  {
    icon: Feather,
    title: 'Writing Services',
    description:
      'Clear and compelling copy is essential. Our writers provide professional content for your website, blog, or scripts, ensuring your message is heard loud and clear.',
    features: [
      'SEO Blog Writing',
      'Website & Landing Page Copy',
      'Video Scriptwriting',
      'Proofreading & Editing',
    ],
    color: 'text-yellow-500',
  },
];

// --- Mock Data for Process Steps ---
const processSteps = [
  {
    id: '01',
    name: 'Discovery & Quote',
    description:
      'We start by understanding your vision and goals. You fill out our order form, and we provide a detailed quote and timeline.',
  },
  {
    id: '02',
    name: 'Design & Develop',
    description:
      'Our team gets to work, crafting your designs or building your website. We provide regular updates and milestones.',
  },
  {
    id: '03',
    name: 'Review & Revise',
    description:
      "We present the draft for your feedback. We'll collaborate with you to make any necessary revisions until it's perfect.",
  },
  {
    id: '04',
    name: 'Deliver & Support',
    description:
      'Once approved, we deliver the final files. We also offer ongoing support to ensure you’re set up for success.',
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-white dark:bg-gray-900">
      {/* --- 1. Hero Section (MODIFIED) --- */}
      <div className="relative h-[500px] lg:h-[700px] w-full">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80"
          alt="Our Services"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          priority
        />
        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Our Services
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-200 max-w-2xl mx-auto">
            We offer a complete suite of digital services to bring your ideas to
            life. From design to development, we are your creative partner.
          </p>
        </div>
      </div>

      {/* --- 2. Services Grid --- */}
      <div className="py-24 sm:py-32">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:max-w-none grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service) => (
              <div
                key={service.title}
                className="flex flex-col p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg"
              >
                <div className="shrink-0">
                  <service.icon
                    className={`h-10 w-10 ${service.color}`}
                    aria-hidden="true"
                  />
                </div>
                <div className="grow mt-6">
                  <h3
                    className={`text-2xl font-bold ${service.color} dark:${service.color}`}
                  >
                    {service.title}
                  </h3>
                  <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-x-3">
                        <Check
                          className="h-5 w-5 text-emerald-500"
                          aria-hidden="true"
                        />
                        <span className="text-gray-700 dark:text-gray-200">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 3. How It Works --- */}
      <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Our Process
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              We follow a simple, four-step process to ensure quality and
              clarity from start to finish.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {processSteps.map((step) => (
              <div
                key={step.id}
                className="flex flex-col text-center md:text-left"
              >
                <div className="text-3xl font-bold text-rose-500">
                  {step.id}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {step.name}
                </h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 4. CTA Section --- */}
      <div className="bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl py-24 px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Visit our order page to tell us about your project and get a
            custom quote.
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