'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Users,
  Image as ImageIcon,
} from 'lucide-react';

// --- Define the tabs for your admin panel ---
const tabs = [
  { name: 'Dashboard', href: 'home', icon: LayoutDashboard },
  { name: 'Orders', href: 'orders', icon: FileText },
  { name: 'Portfolio', href: 'portfolio', icon: ImageIcon },
  { name: 'Messages', href: 'messages', icon: MessageSquare },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminTabs() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter(); // We will use router.push()

  const currentTab = searchParams.get('tab') || 'home';

  const handleTabClick = (tabHref: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', tabHref);
    params.delete('page'); // Reset page to 1 when switching tabs
    
    // --- THIS IS THE FIX ---
    // Use router.push() to trigger a re-render of the Server Component
    router.push(`${pathname}?${params.toString()}`);
    // --- END OF FIX ---
  };

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2 pl-3 pr-10 text-base focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
          value={currentTab}
          onChange={(e) => handleTabClick(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.href}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab.href)}
                className={classNames(
                  tab.href === currentTab
                    ? 'border-rose-500 text-rose-600 dark:border-rose-400 dark:text-rose-400'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-300',
                  'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium transition-colors',
                )}
                aria-current={tab.href === currentTab ? 'page' : undefined}
              >
                <tab.icon
                  className={classNames(
                    tab.href === currentTab
                      ? 'text-rose-500 dark:text-rose-400'
                      : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300',
                    '-ml-0.5 mr-2 h-5 w-5',
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}