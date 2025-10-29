import Image from 'next/image';
import Link from 'next/link';
import { Benefits } from '@/components/home/Benefits'; // Import the new client component

// --- 1. Hero Section ---
// Rebuilt from Hero.jsx
function Hero() {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg">
      <div className="container mx-auto max-w-full flex flex-col-reverse lg:flex-row items-center">
        <div className="flex flex-col justify-center p-10 lg:p-20 lg:w-[70%]">
          <h1 className="text-4xl lg:text-5xl font-bold lg:font-extrabold text-center lg:text-left text-black dark:text-white">
            Welcome to{' '}
            <span className="text-rose-500">PhotoBytes Studios</span>
          </h1>
          <p className="font-medium text-slate-600 dark:text-slate-400 text-base lg:text-lg mt-8 w-auto text-center lg:text-left lg:w-[650px]">
            We provide online services. GFX Design, Web Design, Motion GFX, and
            writing services are available from PhotoBytes Studios. To view all
            our services, visit the order page or if you got any enquiries,
            feel free to contact us.
          </p>
          <div className="flex flex-row items-center justify-center lg:justify-start mt-10 gap-4">
            <Link
              href="/order"
              className="p-3 text-center rounded shadow-xl w-[140px] font-semibold text-xl text-white bg-rose-600 hover:bg-rose-700 transition-colors"
            >
              Order
            </Link>
            <Link
              href="/contact"
              className="p-3 text-center rounded w-[140px] font-semibold text-rose-600 text-xl bg-rose-100 hover:bg-rose-200 dark:bg-gray-800 dark:text-rose-400 dark:hover:bg-gray-700 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="relative w-full h-[400px] lg:w-[30%] lg:h-[600px]">
          <Image
            src="https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2155"
            className="object-cover min-w-full"
            fill
            priority
            alt="Abstract design setup"
          />
        </div>
      </div>
    </div>
  );
}

// --- 2. Services Section ---
// Rebuilt from Services.jsx, removed FontAwesome
function Services() {
  // Mock data for serviceCards
  const serviceCards = [
    {
      title: 'GFX Design',
      desc: 'High-quality graphic design for logos, branding, and marketing materials.',
      color: '#ef4444', // red-500
    },
    {
      title: 'Motion GFX',
      desc: 'Engaging motion graphics and animations for videos and presentations.',
      color: '#3b82f6', // blue-500
    },
    {
      title: 'Web Design',
      desc: 'Modern, responsive website design and development from scratch.',
      color: '#10b981', // emerald-500
    },
    {
      title: 'Writing Services',
      desc: 'Professional content writing for blogs, websites, and scripts.',
      color: '#eab308', // yellow-600
    },
  ];

  // Simple placeholder icon
  const PlaceholderIcon = ({ color }: { color: string }) => (
    <svg
      className="my-6 h-20 w-20 mx-auto"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5.052 14.25M9.75 3.104a2.25 2.25 0 00-1.07 1.916v10.07a2.25 2.25 0 00.868 1.838l3.74 2.74a2.25 2.25 0 002.862 0l3.74-2.74a2.25 2.25 0 00.868-1.838V5.02a2.25 2.25 0 00-1.07-1.916l-4.5-2.25a2.25 2.25 0 00-1.618 0z"
      />
    </svg>
  );

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl flex flex-col items-center justify-center mt-20 mb-2 px-5">
        <h2 className="text-black dark:text-white text-center text-4xl font-serif mb-1">
          Our Services
        </h2>
        <hr className="bg-slate-800 dark:bg-slate-300 h-0.5 w-28 mx-auto mb-5" />
        <p className="text-slate-600 dark:text-slate-400 text-base lg:text-lg font-sans text-center max-w-2xl mx-auto mb-10">
          We provide the most in-demand online services. The major ones are
          listed below with their descriptions.
        </p>
        <div className="container p-5 grid grid-cols-1 md:grid-cols-2 gap-4 lg:w-[80%]">
          {serviceCards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col items-center justify-center p-5 bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition rounded-lg"
            >
              <PlaceholderIcon color={card.color} />
              <h3 className="text-black dark:text-white text-center uppercase font-sans font-medium text-2xl mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-center font-sans text-neutral-700 dark:text-neutral-300 mb-3 w-[80%] mx-auto">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- 3. Features Section ---
// Rebuilt from Features.jsx
function Features() {
  // Mock data for featureCards
  const featureCards = [
    {
      title: 'Fast Delivery',
      desc: 'We prioritize efficient workflows to deliver your projects on time, every time.',
      imgUrl:
        'https://images.unsplash.com/photo-1684695749267-233af13276d0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    },
    {
      title: 'Quality Guaranteed',
      desc: 'Our commitment to quality ensures you receive a polished, professional final product.',
      imgUrl:
        'https://images.unsplash.com/photo-1426927308491-6380b6a9936f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2071',
    },
  ];

  return (
    <div className="w-full p-10 bg-slate-100 dark:bg-gray-800 mt-20">
      <div className="container mx-auto max-w-7xl flex flex-col xl:flex-row gap-5 justify-center items-center">
        <div className="flex flex-col justify-center xl:p-12 w-full lg:w-auto">
          <p className="text-sm text-center xl:text-left mx-auto xl:mx-0 text-slate-500 dark:text-slate-400 mb-2">
            Achieve More
          </p>
          <h2 className="font-extrabold text-2xl text-center xl:text-left sm:text-4xl text-slate-800 dark:text-white mb-4">
            We provide you the best product
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 w-full lg:w-[60%]">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="w-full rounded-lg flex flex-col items-center justify-center shadow-xl hover:shadow-2xl transition bg-white dark:bg-gray-700 overflow-hidden"
            >
              <div className="relative w-full h-[200px]">
                <Image
                  src={card.imgUrl}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-center text-slate-800 dark:text-white text-lg font-bold mb-3">
                  {card.title}
                </h3>
                <p className="mb-3 text-slate-500 dark:text-slate-300 text-sm font-medium text-center">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- 5. Newsletter Section ---
// Rebuilt from Newsletter.jsx, removed form logic
function Newsletter() {
  return (
    <div className="w-full p-10 bg-slate-100 dark:bg-gray-800">
      <div className="container mx-auto max-w-3xl h-[400px] flex flex-col items-center justify-center">
        <h2 className="text-center mx-auto text-4xl md:text-5xl font-bold md:font-extrabold text-black dark:text-white mt-10">
          Subscribe to our newsletter!
        </h2>
        <p className="text-center mx-auto text-base md:text-lg font-normal text-slate-500 dark:text-slate-400 my-4">
          Want to receive news about our products? You can subscribe to our
          newsletter!
        </p>
        {/* Visual-only form */}
        <form className="flex flex-row items-center justify-center mt-6 mb-16">
          <input
            type="email"
            className="w-[300px] border-2 text-black dark:text-white border-black dark:border-gray-500 bg-white dark:bg-gray-700 p-3 rounded-l-md"
            placeholder="Your email address"
            required
          />
          <button
            type="button"
            disabled
            className="p-3 w-[100px] rounded-r-md bg-black dark:bg-gray-600 text-white font-medium opacity-60 cursor-not-allowed"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

// --- Main Home Page ---
export default function HomePage() {
  return (
    <main className="bg-white dark:bg-gray-900">
      <Hero />
      <Services />
      <Features />
      <Benefits /> {/* This is now imported from its own client file */}
      <Newsletter />
    </main>
  );
}