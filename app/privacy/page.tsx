import { Atkinson_Hyperlegible } from 'next/font/google';
import type { Metadata } from 'next';
// Removed Fragment, Navbar, and Footer imports

const atkinson_hyperlegible = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Privacy Policy & Terms of Service | PhotoBytes Studios',
  description:
    'Read the privacy policy and terms of service for PhotoBytes Studios.',
};

export default function PrivacyPage() {
  return (
    // Removed outer Fragment and Div.
    // This <main> tag is the new top-level element for this page.
    // It will be placed inside the <body> from layout.tsx
    <main
      className={`max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 sm:p-12 text-gray-800 dark:text-gray-300 leading-relaxed my-12 rounded-lg shadow-lg ${atkinson_hyperlegible.className}`}
    >
      {/* --- PRIVACY POLICY START --- */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-center mb-8 text-gray-900 dark:text-white">
        Privacy Policy
      </h1>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-12">
        Effective Date: October 2025 <br />
        Last Updated: October 2025
      </p>

      <section className="mb-12 text-lg">
        <p>
          At <strong>PhotoBytes Studios</strong>, accessible from{' '}
          <a
            href="https://photobytes-reworked.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            https://photobytes-reworked.vercel.app
          </a>
          , protecting the privacy of our visitors is one of our top
          priorities. This Privacy Policy explains the types of information
          collected and how it is used.
        </p>
        <p className="mt-4">
          If you have any questions or need more details about our Privacy
          Policy, please feel free to contact us.
        </p>
      </section>

      <hr className="my-8 border-gray-300 dark:border-gray-700" />

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Consent</h2>
        <p className="text-lg">
          By using our website, you consent to our Privacy Policy and agree
          to its terms.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Information We Collect</h2>
        <p className="text-lg">
          The personal information you are asked to provide, and the reasons
          why you are asked to provide it, will always be made clear at the
          point we request it.
        </p>
        <ul className="list-disc ml-6 mt-4 space-y-2 text-lg">
          <li>
            If you contact us directly, we may collect your name, email,
            phone, and the contents of your message (including attachments).
          </li>
          <li>
            If you register for an account, we may ask for your name,
            username, and email.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">How We Use Your Information</h2>
        <p className="text-lg">We may use the information we collect to:</p>
        <ul className="list-disc ml-6 mt-4 space-y-2 text-lg">
          <li>Provide, operate, and improve our website</li>
          <li>Personalize your experience</li>
          <li>Develop new features and services</li>
          <li>Communicate with you (support, updates, promotions)</li>
          <li>Send emails and newsletters</li>
          <li>Detect and prevent fraudulent activity</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Log Files</h2>
        <p className="text-lg">
          Like most websites, PhotoBytes Studios uses log files. These may
          include IP addresses, browser type, Internet Service Provider
          (ISP), date/time stamps, referring/exit pages, and click data.
          This information is not linked to personally identifiable data and
          is used for analyzing trends, administering the site, and
          tracking user behavior.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Cookies</h2>
        <p className="text-lg">
          We use cookies to store information about visitor preferences and
          the pages visited. This helps us optimize content and improve user
          experience. You can disable cookies in your browser settings if
          you prefer.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Third-Party Services</h2>
        <p className="text-lg">
          PhotoBytes Studios may work with third-party services (such as
          analytics or advertisers). These parties may use cookies or other
          technologies to measure effectiveness and personalize content. We
          do not control their tracking technologies.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Your Data Protection Rights
        </h2>
        <p className="text-lg">
          Depending on your location, you may have rights including:
        </p>
        <ul className="list-disc ml-6 mt-4 space-y-2 text-lg">
          <li>The right to access your personal data</li>
          <li>The right to correct inaccurate information</li>
          <li>The right to request deletion of your data</li>
          <li>The right to restrict or object to processing</li>
          <li>The right to data portability</li>
        </ul>
        <p className="mt-4 text-lg">
          If you make a request, we will respond within one month. To
          exercise any of these rights, please contact us.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Children&apos;s Privacy</h2>
        <p className="text-lg">
          We do not knowingly collect any personally identifiable
          information from children under the age of 13. If you believe your
          child provided such information, please contact us and we will
          promptly remove it.
        </p>
      </section>

      <section className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Privacy Policy Contact
        </h2>
        <p className="text-lg">
          If you have any questions about this Privacy Policy, please
          contact us at{' '}
          <a
            href="mailto:info.photobytes@gmail.com"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            info.photobytes@gmail.com
          </a>
        </p>
      </section>
      {/* --- PRIVACY POLICY END --- */}

      {/* --- DIVIDER --- */}
      <hr className="my-16 border-t-2 border-gray-300 dark:border-gray-700" />

      {/* --- TERMS OF SERVICE START --- */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-center mb-8 text-gray-900 dark:text-white">
        Terms of Service
      </h1>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-12">
        Effective Date: October 2025 <br />
        Last Updated: October 2025
      </p>

      <section className="mb-12 text-lg">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">1. Agreement to Terms</h2>
        <p>
          By accessing or using our website (the &quot;Service&quot;), operated by
          PhotoBytes Studios (&quot;us,&quot; &quot;we,&quot; or &quot;our&quot;), you agree to be bound
          by these Terms of Service (&quot;Terms&quot;). If you disagree with any
          part of the terms, you may not access the Service.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">2. User Accounts</h2>
        <p className="text-lg">
          When you create an account with us, you must provide information
          that is accurate, complete, and current at all times. Failure to
          do so constitutes a breach of the Terms, which may result in
          immediate termination of your account on our Service.
        </p>
        <p className="mt-4 text-lg">
          You are responsible for safeguarding the password that you use to
          access the Service and for any activities or actions under your
          password. You agree not to disclose your password to any third
          party.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">3. User Content</h2>
        <p className="text-lg">
          Our Service may allow you to post, link, store, share, and
          otherwise make available certain information, text, graphics,
          videos, or other material (&quot;Content&quot;). You are responsible for
          the Content that you post on or through the Service, including
          its legality, reliability, and appropriateness.
        </p>
        <p className="mt-4 text-lg">
          By posting Content, you grant us the right and license to use,
          modify, publicly perform, publicly display, reproduce, and
          distribute such Content on and through the Service. You retain
          any and all of your rights to any Content you submit.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">4. Prohibited Activities</h2>
        <p className="text-lg">
          You agree not to use the Service for any purpose that is
          unlawful or prohibited by these Terms, including but not limited
          to:
        </p>
        <ul className="list-disc ml-6 mt-4 space-y-2 text-lg">
          <li>
            Harassing, abusing, or harming another person.
          </li>
          <li>
            Posting any Content that is fraudulent, defamatory, or obscene.
          </li>
          <li>
            Transmitting any viruses, worms, or other malicious code.
          </li>
          <li>
            Attempting to gain unauthorized access to any accounts,
            computer systems, or networks.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">5. Intellectual Property</h2>
        <p className="text-lg">
          The Service and its original content (excluding Content provided
          by users), features, and functionality are and will remain the
          exclusive property of PhotoBytes Studios and its licensors.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">6. Termination</h2>
        <p className="text-lg">
          We may terminate or suspend your account immediately, without
          prior notice or liability, for any reason whatsoever, including
          without limitation if you breach the Terms.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          7. Disclaimer of Warranties
        </h2>
        <p className="text-lg">
          Your use of the Service is at your sole risk. The Service is
          provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We expressly
          disclaim all warranties of any kind, whether express or implied.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          8. Limitation of Liability
        </h2>
        <p className="text-lg">
          In no event shall PhotoBytes Studios, nor its directors,
          employees, or partners, be liable for any indirect, incidental,
          special, consequential, or punitive damages arising out of your
          use of the Service.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">9. Governing Law</h2>
        <p className="text-lg">
          These Terms shall be governed and construed in accordance with
          the laws of the jurisdiction in which PhotoBytes Studios is
          based, without regard to its conflict of law provisions.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          10. Changes to These Terms
        </h2>
        <p className="text-lg">
          We reserve the right, at our sole discretion, to modify or
          replace these Terms at any time. We will provide at least 30
          days&apos; notice prior to any new terms taking effect.
        </p>
      </section>

      <section className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Terms of Service Contact
        </h2>
        <p className="text-lg">
          If you have any questions about these Terms, please contact us
          at{' '}
          <a
            href="mailto:info.photobytes@gmail.com"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            info.photobytes@gmail.com
          </a>
        </p>
      </section>
      {/* --- TERMS OF SERVICE END --- */}
    </main>
  );
}