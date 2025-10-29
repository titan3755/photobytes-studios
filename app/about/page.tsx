import Image from 'next/image';
import Link from 'next/link';

// --- Hero Section ---
// Rebuilt from Hero.jsx
function Hero() {
  return (
    <div className="relative w-full h-[450px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1527067829737-402993088e6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3840&q=80"
        alt="Abstract background image"
        fill
        priority
        className="object-cover brightness-[.35] saturate-125"
      />
      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center p-10 text-center">
        <h1 className="text-4xl font-bold text-rose-500 md:text-5xl md:font-extrabold">
          About PhotoBytes Studios
        </h1>
        <p className="mt-6 max-w-xl text-base font-medium text-slate-200 md:w-[620px]">
          PhotoBytes Studios is an online service based in Bangladesh which
          provides customers with digital works such as GFX Design, Art &
          Illustration, Motion GFX, Web Design as well as writing services.
        </p>
      </div>
    </div>
  );
}

// --- Content Section ---
// Rebuilt from Content.jsx, removed @nextui-org/react and fontawesome
function Content() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl p-10">
        <div className="flex flex-col items-center gap-10 xl:flex-row xl:items-start">
          {/* Rebuilt Card Component (formerly OldContentCard) */}
          <div className="w-full max-w-lg overflow-hidden rounded-lg shadow-2xl md:w-[500px] bg-white dark:bg-gray-800">
            <div className="relative h-[300px] w-full">
              <Image
                src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Code on a computer screen"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                PhotoBytes Studios
              </h3>
              <p className="mt-2 text-base font-medium text-slate-600 dark:text-slate-300">
                PhotoBytes Studios is a fairly new company and we are looking
                forward to its progress in the near future.
              </p>
              <p className="mt-3 text-sm font-normal text-slate-400 dark:text-slate-500">
                Founders of PhotoBytes Studios
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1">
            <h2 className="text-center text-4xl font-extrabold italic text-gray-900 dark:text-white xl:text-left">
              The beginnings of PhotoBytes Studios
            </h2>
            <div className="mt-5 space-y-3 text-base font-medium text-slate-500 dark:text-slate-400">
              <p>
                Most of the successful organizations and companies of the world
                were started from humble beginnings. From nothing, they rose to
                success. We at PhotoBytes Studios are trying to make this
                company successful as well. It&apos;s sad that we are still
                waiting to receive our first order but we believe that once we
                do, success will be ours too.
              </p>
              <p>
                PhotoBytes Studios was formed in the midst of 2020, when the
                COVID-19 pandemic was raging throughout the world. During the
                pandemic, two students wanted to use their time wisely instead of
                wasting it. They were{' '}
                <a
                  href="https://www.facebook.com/mahmud.almuhaimin.90/"
                  className="text-blue-600 underline dark:text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mahmud Al Muhaimin
                </a>{' '}
                and{' '}
                <a
                  href="https://www.facebook.com/adib.azwad.999"
                  className="text-blue-600 underline dark:text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Adib Azwad
                </a>
                , the founders of PhotoBytes Studios. They decided to learn the
                basics of Graphics Design, Motion Graphics and Web Development
                to provide this skill to other people as a paid service. So,
                they decided to form PhotoBytes Studios.
              </p>
              <p>
                Right now, Photobytes Studios barely deserves the title to be a
                company as we are yet to make our first sale but the hopes are
                high. As the world becomes more and more dependent on the
                internet and IT, the demand for digital products will steadily
                increase, so will the progression of this company through the
                tunnels of success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- FAQs Section ---
// Rebuilt from Faqs.jsx, removed uuid, mocked data
function Faqs() {
  // Mock data as it was not provided
  const faqCards = [
    {
      title: 'What services do you offer?',
      desc: 'We offer a wide range of digital services, including GFX Design, Motion GFX, Web Design, and writing services.',
      imgSrc:
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    },
    {
      title: 'How long does an order take?',
      desc: 'Delivery times vary based on the project scope. A simple logo may take 2-3 days, while a full website can take several weeks.',
      imgSrc:
        'https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    },
    {
      title: 'What are your prices?',
      desc: 'Our prices are project-based. Please contact us with your requirements for a custom quote.',
      imgSrc:
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    },
  ];

  return (
    <div className="w-full bg-slate-100 dark:bg-gray-800 shadow-lg p-10 md:p-20 my-5">
      <div className="container mx-auto max-w-7xl">
        <div className="ml-0 md:ml-5 my-5">
          <h2 className="text-center text-2xl font-bold text-slate-800 dark:text-white md:text-left">
            Frequently asked questions
          </h2>
          <p className="mt-2 w-auto text-center text-base font-normal text-slate-500 dark:text-slate-400 md:w-[550px] md:text-left">
            Below are some of the most common questions as well as answers
            regarding our services. Have more enquiries? Contact our customer
            support.
          </p>
        </div>
        <div className="my-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {faqCards.map((card, index) => (
            <div
              key={index}
              className="flex h-[600px] flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-700 shadow-2xl transition-all duration-300 hover:scale-[102%] md:my-0 md:h-auto lg:h-[500px]"
            >
              <div className="relative h-1/2 w-full md:hidden lg:block">
                <Image
                  src={card.imgSrc}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-1/2 flex-col justify-center p-7 md:h-auto">
                <h3 className="mb-2 text-2xl font-extrabold text-gray-900 dark:text-white md:text-lg md:font-bold">
                  {card.title}
                </h3>
                <p className="text-base font-normal text-slate-500 dark:text-slate-400">
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

// --- CTA Section ---
// Rebuilt from Cta.jsx
function Cta() {
  return (
    <div className="container mx-auto max-w-7xl p-10 my-10">
      <div className="flex flex-col overflow-hidden rounded-lg shadow-xl xl:flex-row">
        <div className="relative w-full xl:w-[50%] h-64 xl:h-auto">
          <Image
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Team working at a desk"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex w-full flex-col justify-center bg-slate-700 p-10 xl:w-[50%]">
          <h3 className="text-center text-base font-semibold text-slate-400 sm:text-left">
            BLAZING FAST RESPONSES
          </h3>
          <h2 className="my-2 text-center text-4xl font-extrabold text-white sm:text-left">
            We&apos;re here to help
          </h2>
          <p className="my-2 w-auto text-center text-base font-normal text-slate-300 sm:w-[500px] sm:text-left">
            Facing any problems with our services or do you want to provide
            feedback or complaints? Contact us directly by Facebook Messenger or
            via other platforms to let us know of your problems!
          </p>
          <div className="mt-7 flex justify-center sm:justify-start">
            <Link
              href="/contact"
              className="w-[200px] rounded-lg bg-white p-4 text-center text-lg font-medium text-black transition-transform duration-200 hover:scale-[96%]"
            >
              Customer Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main About Page ---
// This is the default export that combines all sections
export default function AboutPage() {
  return (
    <main className="bg-white dark:bg-gray-900">
      <Hero />
      <Content />
      <Faqs />
      <Cta />
    </main>
  );
}
