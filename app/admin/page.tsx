import Link from 'next/link';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import {
  type PortfolioItem,
  type ContactMessage,
  type Order,
  Role,
  OrderStatus,
} from '@prisma/client';

// Import Admin Components
import AdminTabs from './AdminTabs';
import AdminPagination from './AdminPagination';
import OrderRowActions from './OrderRowActions';
import MessageRowActions from './MessageRowActions';
import PortfolioRowActions from './PortfolioRowActions';
import { CreatePortfolioButton } from './CreatePortfolioButton'; // We will create this

// --- Helper: Stat Card ---
function StatCard({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

// --- Helper: Order Status Badge ---
function OrderStatusBadge({ status }: { status: OrderStatus }) {
  let colors = '';
  switch (status) {
    case 'PENDING':
      colors =
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      break;
    case 'IN_PROGRESS':
      colors = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      break;
    case 'COMPLETED':
      colors =
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      break;
    case 'CANCELLED':
      colors = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      break;
    default:
      colors = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors}`}
    >
      {status.replace('_', ' ')}
    </span>
  );
}

// --- Page Component ---
export default async function AdminPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // 1. Authentication & Authorization
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) {
    redirect('/forbidden'); // Redirect non-admins to the 403 page
  }

  // 2. Get current tab and pagination
  const sp = await searchParams;
  const currentTab = sp.tab || 'home';
  const currentPage = Number(sp.page) || 1;
  const pageSize = 10;
  const skip = (currentPage - 1) * pageSize;
  let pagination = { currentPage: 1, totalPages: 1 };

  // 3. Data variables
  let stats: any = {};
  let allOrders: (Order & { author: { name: string | null } | null })[] = [];
  let portfolioItems: PortfolioItem[] = [];
  let contactMessages: ContactMessage[] = [];

  // 4. Fetch data based on the current tab
  try {
    if (currentTab === 'home') {
      const [
        totalOrders,
        pendingOrders,
        totalPortfolioItems,
        totalMessages,
        unreadMessages,
      ] = await prisma.$transaction([
        prisma.order.count(),
        prisma.order.count({ where: { status: 'PENDING' } }),
        prisma.portfolioItem.count(),
        prisma.contactMessage.count(),
        prisma.contactMessage.count({ where: { isRead: false } }),
      ]);
      stats = {
        totalOrders,
        pendingOrders,
        totalPortfolioItems,
        totalMessages,
        unreadMessages,
      };
    } else if (currentTab === 'orders') {
      const [orders, totalCount] = await prisma.$transaction([
        prisma.order.findMany({
          orderBy: { createdAt: 'desc' },
          include: { author: { select: { name: true } } },
          take: pageSize,
          skip: skip,
        }),
        prisma.order.count(),
      ]);
      allOrders = orders;
      pagination.totalPages = Math.ceil(totalCount / pageSize);
    } else if (currentTab === 'portfolio') {
      const [items, totalCount] = await prisma.$transaction([
        prisma.portfolioItem.findMany({
          orderBy: { createdAt: 'desc' },
          take: pageSize,
          skip: skip,
        }),
        prisma.portfolioItem.count(),
      ]);
      portfolioItems = items;
      pagination.totalPages = Math.ceil(totalCount / pageSize);
    } else if (currentTab === 'messages') {
      const [messages, totalCount] = await prisma.$transaction([
        prisma.contactMessage.findMany({
          orderBy: { createdAt: 'desc' },
          take: pageSize,
          skip: skip,
        }),
        prisma.contactMessage.count(),
      ]);
      contactMessages = messages;
      pagination.totalPages = Math.ceil(totalCount / pageSize);
    }
  } catch (error) {
    console.error('Failed to fetch admin data:', error);
    // You could render an error state here
  }
  
  pagination.currentPage = currentPage;

  // --- 5. Render Page ---
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl w-full mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          Admin Control Panel
        </h1>

        <AdminTabs />

        {/* --- Conditionally Render the Active Tab's Content --- */}
        <div className="space-y-12">
          {/* --- HOME TAB --- */}
          {currentTab === 'home' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard title="Total Orders" value={stats.totalOrders} />
              <StatCard title="Pending Orders" value={stats.pendingOrders} />
              <StatCard
                title="Portfolio Items"
                value={stats.totalPortfolioItems}
              />
              <StatCard title="Total Messages" value={stats.totalMessages} />
              <StatCard
                title="Unread Messages"
                value={stats.unreadMessages}
              />
            </div>
          )}

          {/* --- ORDERS TAB --- */}
          {currentTab === 'orders' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                All Orders
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Customer
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Budget
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {allOrders.length > 0 ? (
                      allOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {order.author?.name || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {order.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {order.budget || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <OrderStatusBadge status={order.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <OrderRowActions order={order} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                        >
                          No orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <AdminPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
              />
            </div>
          )}

          {/* --- PORTFOLIO TAB --- */}
          {currentTab === 'portfolio' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Portfolio Management
                </h2>
                <CreatePortfolioButton />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Image URL
                      </th>
                      <th
                        scope="col"
                        className="relative px-6 py-3 text-right"
                      >
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {portfolioItems.length > 0 ? (
                      portfolioItems.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {item.category}
                          </td>
                          <td className="px-6 py-4 max-w-sm">
                            <Link
                              href={item.imgUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 dark:text-blue-400 hover:underline truncate"
                            >
                              {item.imgUrl}
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <PortfolioRowActions item={item} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                        >
                          No portfolio items found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <AdminPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
              />
            </div>
          )}

          {/* --- MESSAGES TAB --- */}
          {currentTab === 'messages' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                Contact Messages
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Received
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        From
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Message
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="relative px-6 py-3 text-right"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {contactMessages.length > 0 ? (
                      contactMessages.map((message) => (
                        <tr
                          key={message.id}
                          className={`${
                            message.isRead
                              ? 'opacity-70 dark:opacity-60'
                              : 'font-semibold'
                          } hover:bg-gray-50 dark:hover:bg-gray-700`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(message.createdAt).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {message.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <a
                              href={`mailto:${message.email}`}
                              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              {message.email}
                            </a>
                          </td>
                          <td className="px-6 py-4 max-w-sm">
                            <p
                              className="text-sm text-gray-700 dark:text-gray-300 truncate"
                              title={message.message}
                            >
                              {message.message}
                            </p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                message.isRead
                                  ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 animate-pulse'
                              }`}
                            >
                              {message.isRead ? 'Read' : 'Unread'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <MessageRowActions message={message} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                        >
                          No contact messages received yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <AdminPagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}