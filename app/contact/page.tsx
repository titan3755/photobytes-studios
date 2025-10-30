import Image from 'next/image';
import { auth } from '@/auth'; // Import your auth config
import { ContactForm } from './ContactForm'; // Import the new Client Component

// --- Hero Section ---
// This can stay here as it's a static Server Component
function Hero() {
  return (
    <div className="relative w-full h-[500px] lg:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=3840&q=80"
        alt="Abstract design setup"
        fill
        priority
        className="object-cover contrast-125 saturate-200 brightness-50"
      />
      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center p-10 text-center">
        <h1 className="text-5xl font-bold text-white lg:text-7xl lg:font-extrabold">
          Contact Us
        </h1>
        <p className="mt-3 max-w-2xl text-base font-normal text-slate-300 lg:w-[650px]">
          PhotoBytes Studios customer support is blazing fast. If you got any
          enquiries or if you need help with anything related to PhotoBytes
          Studios then feel free to contact us!
        </p>
      </div>
    </div>
  );
}

// --- Main Contact Page (Server Component) ---
export default async function ContactPage() {
  // 1. Get the session on the server
  const session = await auth();
  const user = session?.user;

  // 2. Render the Hero and pass the user to the Client Component
  return (
    <main className="bg-white dark:bg-gray-900">
      <Hero />
      <ContactForm user={user} />
    </main>
  );
}