import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MessageInterface from '@/components/messaging/MessageInterface';
import { OrderStatus, Role } from '@prisma/client';

// Helper: Order Status Badge
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
      className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${colors}`}
    >
      {status.replace('_', ' ')}
    </span>
  );
}

export default async function AdminOrderPage({
  params,
}: {
  params: { orderId: string };
}) {
    const p = await params;
  // 1. Get session
  const session = await auth();
  if (!session?.user) {
    redirect(`/login?callbackUrl=/admin/orders/${p.orderId}`);
  }

  // 2. Security Check: Ensure user is an ADMIN
  if (session.user.role !== Role.ADMIN) {
    redirect('/forbidden');
  }

  // 3. Fetch the order and its messages
  const order = await prisma.order.findUnique({
    where: { id: p.orderId },
    include: {
      author: {
        select: { name: true, email: true, username: true },
      },
      messages: {
        orderBy: { createdAt: 'asc' },
        include: {
          sender: {
            select: { id: true, name: true, image: true, role: true },
          },
        },
      },
    },
  });

  if (!order) {
    redirect('/not-found');
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl w-full mx-auto space-y-6">
        {/* --- Header --- */}
        <div>
          <Link
            href="/admin?tab=orders"
            className="inline-flex items-center gap-2 text-sm font-medium text-rose-600 hover:text-rose-500 dark:text-rose-400 dark:hover:text-rose-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Orders
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Order: {order.category}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Client: {order.author?.name || order.author?.username} ({order.author?.email})
              </p>
            </div>
            <div className="mt-2 sm:mt-0">
              <OrderStatusBadge status={order.status} />
            </div>
          </div>
          <p className="mt-2 text-base text-gray-700 dark:text-gray-300">
            {order.description}
          </p>
        </div>

        {/* --- Message Interface --- */}
        <MessageInterface
          orderId={order.id}
          messages={order.messages}
          currentUser={session.user}
        />
      </div>
    </main>
  );
}