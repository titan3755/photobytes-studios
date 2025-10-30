'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSession, signOut } from 'next-auth/react'; // Import auth hooks

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

// --- Helper component for Avatar ---
function getInitials(name?: string | null): string {
  if (!name) return '?';
  const names = name.split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
}

function UserAvatar({
  user,
  size = 'small',
}: {
  user: { name?: string | null; image?: string | null };
  size?: 'small' | 'medium';
}) {
  const sizeClasses = size === 'small' ? 'h-8 w-8' : 'h-10 w-10';
  const textSize = size === 'small' ? 'text-sm' : 'text-base';

  if (user.image) {
    return (
      <img
        className={`${sizeClasses} rounded-full object-cover`}
        src={user.image}
        alt={user.name || 'User avatar'}
        referrerPolicy="no-referrer"
      />
    );
  }
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-rose-500 font-semibold text-white ${sizeClasses} ${textSize}`}
    >
      {getInitials(user.name)}
    </div>
  );
}
// --- End Helper ---

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navDropdownOpen, setNavDropdownOpen] = useState(false); // For "More" dropdown
  const [userDropdownOpen, setUserDropdownOpen] = useState(false); // For User dropdown
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { data: session, status } = useSession(); // Get auth session
  const isAuthenticated = status === 'authenticated';

  const navDropdownRef = useRef<HTMLDivElement>(null); // Ref for "More" dropdown
  const userDropdownRef = useRef<HTMLDivElement>(null); // Ref for User dropdown

  // --- START: Added state for scroll ---
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  // --- END: Added state for scroll ---

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- START: Effect for scroll ---
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // --- END: Effect for scroll ---


  // --- Effect to handle clicking outside dropdowns ---
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navDropdownRef.current &&
        !navDropdownRef.current.contains(event.target as Node)
      ) {
        setNavDropdownOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    }
    if (navDropdownOpen || userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navDropdownOpen, userDropdownOpen]);

  const renderThemeToggle = () => {
    if (!mounted) {
      return <div className="ml-4 h-9 w-9 p-2" />; // Placeholder
    }
    return (
      <button
        type="button"
        className="ml-4 p-2 rounded-full text-gray-500 hover:bg-gray-100/50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white"
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

  // --- Auth Section Placeholder ---
  const authPlaceholder = (
    <>
      <div className="ml-4 h-9 w-9 p-2" />
      <div className="ml-4 h-9 w-20 rounded-md bg-gray-200/50 dark:bg-gray-700/50 animate-pulse"></div>
      <div className="ml-4 h-9 w-24 rounded-md bg-gray-200/50 dark:bg-gray-700/50 animate-pulse"></div>
    </>
  );

  return (
    <>
      {/* --- START: Modified for Glass Effect & Hide on Scroll --- */}
      <div 
        className={classNames(
          'sticky top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-50 duration-300 border-b border-gray-100/50 dark:border-gray-800/50',
          isVisible ? 'translate-y-0' : '-translate-y-full'
          // We add 'duration-300' and 'translate-y' classes for the animation
        )}
      >
      {/* --- END: Modified for Glass Effect & Hide on Scroll --- */}
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
                className="bg-transparent rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
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
              <div className="relative" ref={navDropdownRef}>
                <button
                  type="button"
                  className="inline-flex items-center gap-x-1 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  onClick={() => setNavDropdownOpen(!navDropdownOpen)}
                >
                  <span>More</span>
                  <ChevronDown
                    className={classNames(
                      navDropdownOpen ? 'transform rotate-180' : '',
                      'h-5 w-5 transition-transform duration-200',
                    )}
                    aria-hidden="true"
                  />
                </button>

                {navDropdownOpen && (
                  <div className="absolute -ml-4 mt-3 w-60 transform px-2 sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="relative grid gap-6 bg-white dark:bg-gray-800 px-5 py-6 sm:gap-8 sm:p-8">
                        <Link
                          href="/portfolio"
                          className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                          onClick={() => setNavDropdownOpen(false)}
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
                          onClick={() => setNavDropdownOpen(false)}
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
                          onClick={() => setNavDropdownOpen(false)}
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
              {status === 'loading' || !mounted ? (
                authPlaceholder
              ) : isAuthenticated ? (
                // --- Logged IN UI (Desktop) ---
                <>
                  {renderThemeToggle()}
                  <div className="relative ml-4" ref={userDropdownRef}>
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-2.5 rounded-md bg-white/50 dark:bg-gray-900/50 px-3 py-1.5 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    >
                      <UserAvatar user={session.user} size="small" />
                      <span className="truncate max-w-[150px]">
                        {session.user.username || session.user.name}
                      </span>
                      <ChevronDown className="-mr-0.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </button>

                    {userDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex items-center space-x-3">
                              <div className="shrink-0">
                                <UserAvatar user={session.user} size="medium" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  {session.user.name || session.user.username}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                  {session.user.email}
                                </p>
                              </div>
                            </div>
                          </div>
                          <Link
                            href="/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => setUserDropdownOpen(false)}
                          >
                            Dashboard
                          </Link>
                          {/* Add other links like Profile here if needed */}
                          <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                          <button
                            onClick={() => {
                              setUserDropdownOpen(false);
                              signOut();
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                // --- Logged OUT UI (Desktop) ---
                <>
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
                </>
              )}
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
          {/* --- START: Modified for Glass Effect (Mobile) --- */}
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md divide-y-2 divide-gray-50 dark:divide-gray-700">
          {/* --- END: Modified for Glass Effect (Mobile) --- */}
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

                {renderMobileThemeToggle()}
              </div>

              {/* --- Mobile Auth Section --- */}
              <div className="space-y-4">
                {isAuthenticated ? (
                  // --- Logged IN UI (Mobile) ---
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-rose-600 hover:bg-rose-700"
                    >
                      Dashboard
                    </Link>
                    <p className="mt-6 text-center text-base font-medium text-gray-500 dark:text-gray-400">
                      Welcome, {session.user.username}!{' '}
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          signOut();
                        }}
                        className="text-rose-600 hover:text-rose-500 dark:text-rose-400 dark:hover:text-rose-300"
                      >
                        Logout
                      </button>
                    </p>
                  </>
                ) : (
                  // --- Logged OUT UI (Mobile) ---
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}