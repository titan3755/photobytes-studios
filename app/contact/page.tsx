import Image from 'next/image';

// --- Hero Section ---
// Rebuilt from Hero.jsx
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

// --- Form Section ---
// Rebuilt from Form.jsx
// Removed all state, event handlers, and submission logic as requested
function ContactForm() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl p-5 my-5">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center">
          {/* Form UI */}
          <div className="w-full lg:w-[50%] p-5 md:p-10 lg:p-16">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
              Contact Form
            </h2>
            <p className="text-base font-normal text-center text-slate-500 dark:text-slate-400">
              If you got any enquiries, contact us via the form below and we
              will reach out to you swiftly.
            </p>
            {/* This is now a visual-only form. 
              No onSubmit handler is attached.
            */}
            <form className="mt-7 space-y-4">
              <div className="flex flex-col md:flex-row gap-5">
                <input
                  type="text"
                  className="w-full rounded-md p-3 pl-5 border border-slate-500 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-sans text-base font-medium focus:outline-2 focus:outline-rose-500"
                  placeholder="First Name"
                  name="fn"
                  required
                />
                <input
                  type="text"
                  className="w-full rounded-md p-3 pl-5 border border-slate-500 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-sans text-base font-medium focus:outline-2 focus:outline-rose-500"
                  placeholder="Last Name"
                  name="ln"
                  required
                />
              </div>
              <input
                type="email"
                className="w-full rounded-md p-3 pl-5 border border-slate-500 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-sans text-base font-medium focus:outline-2 focus:outline-rose-500"
                placeholder="Email Address"
                name="email"
                required
              />
              <input
                type="text"
                className="w-full rounded-md p-3 pl-5 border border-slate-500 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-sans text-base font-medium focus:outline-2 focus:outline-rose-500"
                placeholder="Contact Links (Optional)"
                name="cl"
              />
              <textarea
                name="body"
                placeholder="Message Body"
                className="w-full rounded-md p-3 pl-5 border border-slate-500 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-sans text-base font-medium focus:outline-2 focus:outline-rose-500"
                cols={30}
                rows={10}
                required
              ></textarea>
              <button
                type="button"
                disabled
                className="w-full mx-auto max-w-sm rounded-lg bg-rose-500 p-4 text-center text-xl font-bold text-white opacity-50 cursor-not-allowed my-4"
              >
                Submission Disabled
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div className="relative w-full h-96 lg:h-[700px] lg:w-[50%] hidden lg:block">
            <Image
              src="https://images.unsplash.com/photo-1528372444006-1bfc81acab02?auto=format&fit=crop&w=435&q=80"
              alt="Contact form decorative image"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Contact Page ---
export default function ContactPage() {
  return (
    <main className="bg-white dark:bg-gray-900">
      <Hero />
      <ContactForm />
    </main>
  );
}
