import Image from 'next/image';
import Link from 'next/link';
import { Benefits } from '@/components/home/Benefits';
import { AnimatedSection } from '@/components/home/AnimatedSection';
import { Newsletter } from '@/components/home/Newsletter';
import { auth } from '@/auth'; // <-- 1. IMPORT AUTH

// --- 1. Hero Section ---
// (Your existing Hero component code is here...)
function Hero() {
  return (
    // The main container is now relative and has a fixed height
    <div className="relative h-[600px] w-full overflow-hidden">
      {/* Background Image - Added contrast-125 */}
      <Image
        src="https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2155"
        className="object-cover brightness-75 contrast-125" // Dim image for text readability
        fill
        priority
        alt="Abstract design setup"
      />
      {/* Overlay for text content - Added ring-1 ring-white/20 */}
      <div className="absolute inset-0 flex items-center justify-center p-6 backdrop-blur-md bg-white/10 dark:bg-gray-900/10 ring-1 ring-inset ring-white/20">
        {/* Inner container for text alignment and max-width */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl lg:text-5xl font-bold lg:font-extrabold text-white">
            Welcome to <span className="text-rose-400">PhotoBytes Studios</span>
          </h1>
          <p className="font-medium text-slate-200 text-base lg:text-lg mt-8">
            We provide online services. GFX Design, Web Design, Motion GFX, and
            writing services are available from PhotoBytes Studios. To view all
            our services, visit the order page or if you got any enquiries,
            feel free to contact us.
          </p>
          <div className="flex flex-row items-center justify-center mt-10 gap-4">
            <Link
              href="/order"
              className="p-3 text-center rounded shadow-xl w-[140px] font-semibold text-xl text-white bg-rose-600 hover:bg-rose-700 transition-all duration-300 hover:scale-105"
            >
              Order
            </Link>
            <Link
              href="/contact"
              className="p-3 text-center rounded w-[140px] font-semibold text-white text-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 ring-1 ring-white/20"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 2. Services Section ---
// (Your existing Services component code is here...)
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
    <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
      {/* Decorative Gradient Blob */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/10 dark:bg-rose-500/20 rounded-full filter blur-3xl opacity-30 animate-pulse" />

      <div className="container relative mx-auto max-w-7xl flex flex-col items-center justify-center mt-20 mb-2 px-5 z-10">
        <h2 className="text-black dark:text-white text-center text-4xl font-serif mb-1">
          Our Services
        </h2>
        <hr className="bg-slate-800 dark:bg-slate-300 h-0.5 w-28 mx-auto mb-5" />
        <p className="text-slate-600 dark:text-slate-400 text-base lg:text-lg font-sans text-center max-w-2xl mx-auto mb-10">
          We provide the most in-demand online services. The major ones are
          listed below with their descriptions.
        </p>
        <div className="container p-5 grid grid-cols-1 md:grid-cols-2 gap-6 lg:w-[80%]">
          {serviceCards.map((card) => (
            // --- Glassmorphism Card ---
            <div
              key={card.title}
              className="flex flex-col items-center justify-center p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300 hover:shadow-2xl"
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
// (Your existing Features component code is here...)
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
    <div className="relative w-full p-10 bg-slate-100 dark:bg-gray-800 mt-20 overflow-hidden">
      {/* Decorative Gradient Blob */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/20 rounded-full filter blur-3xl opacity-30 animate-pulse animation-delay-3000" />

      <div className="container relative mx-auto max-w-7xl flex flex-col xl:flex-row gap-5 justify-center items-center z-10">
        <div className="flex flex-col justify-center xl:p-12 w-full lg:w-auto">
          <p className="text-sm text-center xl:text-left mx-auto xl:mx-0 text-slate-500 dark:text-slate-400 mb-2">
            Achieve More
          </p>
          <h2 className="font-extrabold text-2xl text-center xl:text-left sm:text-4xl text-slate-800 dark:text-white mb-4">
            We provide you the best product
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 w-full lg:w-[60%]">
          {featureCards.map((card) => (
            // --- Glassmorphism Card ---
            <div
              key={card.title}
              className="w-full rounded-2xl flex flex-col items-center justify-center shadow-xl hover:shadow-2xl transition bg-white/50 dark:bg-gray-700/50 backdrop-blur-lg overflow-hidden ring-1 ring-black ring-opacity-5"
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


// --- Main Home Page ---
export default async function HomePage() { // --- 2. MAKE PAGE ASYNC ---
  
  // --- 3. GET SESSION ON SERVER ---
  const session = await auth();
  
  return (
    <main className="bg-white dark:bg-gray-900">
      <Hero />

      {/* Wrap sections in the animation component */}
      <AnimatedSection>
        <Services />
      </AnimatedSection>
      
      <AnimatedSection>
        <Features />
      </AnimatedSection>

      {/* Benefits is already a client component, so it can be animated too */}
      <AnimatedSection>
        <Benefits />
      </AnimatedSection>
      
      <AnimatedSection>
        {/* --- 4. PASS EMAIL AS PROP --- */}
        <Newsletter userEmail={session?.user?.email} />
      </AnimatedSection>
    </main>
  );
}