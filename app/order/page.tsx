import Image from 'next/image';

// --- Hero Section ---
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

// --- Order Form Section ---
function OrderForm() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl p-5 my-5">
        <div className="flex flex-col items-center justify-center">
          {/* Form UI */}
          <div className="w-full lg:w-3/4 p-5 md:p-10 lg:p-16">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
              Order Details
            </h2>
            <p className="text-base font-normal text-center text-slate-500 dark:text-slate-400">
              Please provide the details of your project. The more information
              you give, the better we can assist you.
            </p>

            {/* Visual-only form with no submission logic */}
            <form className="mt-10 space-y-6">
              {/* Name Fields */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    className="w-full rounded-md p-3 pl-5 border border-slate-500 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-sans text-base font-medium focus:outline-2 focus:outline-rose-500"
                    placeholder="John"
                    name="fn"
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    className="w-full rounded-md p-3 pl-5 border border-slate-500 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-sans text-base font-medium focus:outline-2 focus:outline-rose-500"
                    placeholder="Doe"
                    name="ln"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-md p-3 pl-5 border border-slate-500 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-sans text-base font-medium focus:outline-2 focus:outline-rose-500"
                  placeholder="john.doe@example.com"
                  name="email"
                  required
                />
              </div>

              {/* Service Type */}
              <div>
                <label
                  htmlFor="service-type"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  What service do you need?
                </label>
                <select
                  id="service-type"
                  name="service-type"
                  className="w-full rounded-md p-3 pl-4 border border-slate-500 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-sans text-base font-medium focus:outline-2 focus:outline-rose-500"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service...
                  </option>
                  <option value="gfx">GFX Design</option>
                  <option value="motion">Motion GFX</option>
                  <option value="web">Web Design</option>
                  <option value="writing">Writing Services</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Project Title */}
              <div>
                <label
                  htmlFor="project-title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Project Title / Subject
                </label>
                <input
                  type="text"
                  id="project-title"
                  className="w-full rounded-md p-3 pl-5 border border-slate-500 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-sans text-base font-medium focus:outline-2 focus:outline-rose-500"
                  placeholder="e.g., 'New Logo for my Cafe'"
                  name="title"
                  required
                />
              </div>

              {/* Project Details */}
              <div>
                <label
                  htmlFor="project-details"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Project Details
                </label>
                <textarea
                  id="project-details"
                  name="body"
                  placeholder="Please describe your project. Include any relevant details, links, or specific requirements."
                  className="w-full rounded-md p-3 pl-5 border border-slate-500 dark:border-slate-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-sans text-base font-medium focus:outline-2 focus:outline-rose-500"
                  cols={30}
                  rows={10}
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                disabled
                className="w-full mx-auto max-w-md rounded-lg bg-rose-500 p-4 text-center text-xl font-bold text-white opacity-50 cursor-not-allowed my-4"
              >
                Submission Disabled
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Order Page ---
export default function OrderPage() {
  return (
    <main className="bg-white dark:bg-gray-900">
      <Hero />
      <OrderForm />
    </main>
  );
}