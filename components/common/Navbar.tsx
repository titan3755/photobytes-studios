'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for the new dropdown
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown click outside

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- Effect to handle clicking outside the dropdown ---
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const renderThemeToggle = () => {
    if (!mounted) {
      return <div className="ml-4 h-9 w-9 p-2" />; // Placeholder
    }
    return (
      <button
        type="button"
        className="ml-4 p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        aria-label="Toggle dark mode"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {resolvedTheme === 'dark' ? (
          <Sun className="h-5 w-5" /> // Show Sun in dark mode
        ) : (
          <Moon className="h-5 w-5" /> // Show Moon in light mode
        )}
      </button>
    );
  };

  const renderMobileThemeToggle = () => {
    if (!mounted) return null;
    return (
      <button
        type="button"
        className="flex items-center gap-2 text-base font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
        onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark');
          setMobileMenuOpen(false);
        }}
      >
        {resolvedTheme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
        <span>Toggle Theme</span>
      </button>
    );
  };

  return (
    <>
      <div className="relative bg-white dark:bg-gray-900 border-b-2 border-gray-100 dark:border-gray-800 z-50 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link
                href="/"
                className="min-h-[62px] text-center sm:h-[60px] p-0.5 flex items-center"
              >
                <Image
                  src="/final.svg"
                  alt="PhotoBytes Studios"
                  width={60}
                  height={60}
                  className="rounded-full bg-black p-1"
                />
                <span className="ml-4 text-2xl font-bold text-gray-900 dark:text-white md:hidden">
                  PhotoBytes Studios
                </span>
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <div className="-mr-2 -my-2 md:hidden">
              <button
                type="button"
                className="bg-white dark:bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex space-x-10">
              <Link
                href="/about"
                className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Contact
              </Link>
              <Link
                href="/order"
                className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Order
              </Link>

              {/* --- START: More Dropdown --- */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  className="inline-flex items-center gap-x-1 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span>More</span>
                  <ChevronDown
                    className={classNames(
                      dropdownOpen ? 'transform rotate-180' : '',
                      'h-5 w-5 transition-transform duration-200',
                    )}
                    aria-hidden="true"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute -ml-4 mt-3 w-60 transform px-2 sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="relative grid gap-6 bg-white dark:bg-gray-800 px-5 py-6 sm:gap-8 sm:p-8">
                        <Link
                          href="/portfolio"
                          className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <div className="ml-4">
                            <p className="text-base font-medium text-gray-900 dark:text-white">
                              Portfolio
                            </p>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              See our past work.
                            </p>
                          </div>
                        </Link>
                        <a
                          href="https://photobytes-blog.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <div className="ml-4">
                            <p className="text-base font-medium text-gray-900 dark:text-white">
                              Blog
                            </p>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              Read our latest articles.
                            </p>
                          </div>
                        </a>
                        <Link
                          href="/services"
                          className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <div className="ml-4">
                            <p className="text-base font-medium text-gray-900 dark:text-white">
                              Services
                            </p>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              What we offer.
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* --- END: More Dropdown --- */}
            </nav>

            {/* --- Auth Section (Desktop) --- */}
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              {renderThemeToggle()}
              <Link
                href="/login"
                className="ml-4 whitespace-nowrap text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-rose-600 hover:bg-rose-700"
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        {/* --- Mobile Menu --- */}
        <div
          className={classNames(
            'absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden',
            mobileMenuOpen
              ? 'duration-200 ease-out opacity-100 scale-100'
              : 'duration-100 ease-in opacity-0 scale-95 pointer-events-none',
          )}
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-800 divide-y-2 divide-gray-50 dark:divide-gray-700">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    className="h-[62px] w-auto rounded-full bg-black p-1"
                    src="/final.svg"
                    alt="PhotoBytes Studios"
                    width={62}
                    height={62}
                  />
                  <span className="ml-5 text-2xl font-bold text-gray-900 dark:text-white">
                    PhotoBytes Studios
                  </span>
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="bg-white dark:bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <Link
                  href="/"
                  className="text-base font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-base font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="text-base font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/order"
                  className="text-base font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Order
                </Link>

                {/* --- START: Mobile More Links --- */}
                <Link
                  href="/portfolio"
                  className="text-base font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Portfolio
                </Link>
                <a
                  href="https://photobytes-blog.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </a>
                <Link
                  href="/services"
                  className="text-base font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
                {/* --- END: Mobile More Links --- */}

                {renderMobileThemeToggle()}
              </div>

              <div className="space-y-4">
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-rose-600 hover:bg-rose-700"
                >
                  Register
                </Link>
                <p className="mt-6 text-center text-base font-medium text-gray-500 dark:text-gray-400">
                  Existing customer?{' '}
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-rose-600 hover:text-rose-500 dark:text-rose-400 dark:hover:text-rose-300"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}