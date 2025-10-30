import Image from 'next/image';
import { auth } from '@/auth'; // Import your auth config
import { OrderForm } from './OrderForm'; // Import the new Client Component

// --- Hero Section ---
// This can stay here as it's a static Server Component
function Hero() {
  return (
    <div className="relative w-full h-[500px] lg:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070"
        alt="Order checkout illustration"
        fill
        priority
        className="object-cover contrast-100 brightness-50"
      />
      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center p-10 text-center">
        <h1 className="text-5xl font-bold text-white lg:text-7xl lg:font-extrabold">
          Place an Order
        </h1>
        <p className="mt-3 max-w-2xl text-base font-normal text-slate-300 lg:w-[650px]">
          Ready to start your project? Fill out the form below with as much
          detail as possible, and we&apos;ll get back to you with a quote and
          timeline.
        </p>
      </div>
    </div>
  );
}

// --- Main Order Page (Server Component) ---
export default async function OrderPage() {
  // 1. Get the session on the server
  const session = await auth();
  const user = session?.user;

  // 2. Render the Hero and pass the user to the Client Component
  return (
    <main className="bg-white dark:bg-gray-900">
      <Hero />
      <OrderForm user={user} />
    </main>
  );
}