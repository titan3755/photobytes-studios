import type { Metadata } from 'next';
import { Share_Tech } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { Providers } from './providers';

const share_tech = Share_Tech({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PhotoBytes Blog',
  description: 'The blog website of PhotoBytes Studios',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${share_tech.className} antialiased flex flex-col min-h-screen mx-auto 
                   bg-white text-gray-900 
                   dark:bg-gray-900 dark:text-gray-100 
                   transition-colors duration-200 overflow-x-hidden`}
      >
        <Providers>
          <Navbar />
            <main className="mx-auto grow w-full">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}