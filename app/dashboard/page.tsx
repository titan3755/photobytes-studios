import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient'; // Import the new Client Component
import prisma from '@/lib/prisma';
import { OrderStatus, Role } from '@prisma/client';

// Define the type for the orders we fetch
export type DashboardOrder = {
  id: string;
  createdAt: Date;
  category: string;
  status: OrderStatus;
  description: string;
  _count: {
    // Add unread message count
    messages: number;
  };
};

export default async function DashboardPage() {
  // 1. Get the session on the server
  const session = await auth();

  // 2. If no session, redirect to login
  if (!session || !session.user) {
    redirect('/login?callbackUrl=/dashboard');
  }

  // 3. Fetch the user's 5 most recent orders AND their unread message count
  const orders: DashboardOrder[] = await prisma.order.findMany({
    where: { authorId: session.user.id },
    orderBy: { updatedAt: 'desc' }, // Order by updatedAt to show active first
    select: {
      id: true,
      createdAt: true,
      category: true,
      status: true,
      description: true,
      _count: {
        // Count messages that are not read by the user AND were not sent by the user
        select: {
          messages: {
            where: {
              isReadByUser: false,
              senderId: { not: session.user.id },
            },
          },
        },
      },
    },
    take: 5, // Show 5 most recent
  });

  // 4. Render the Client Component with the user data and orders
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardClient user={session.user} orders={orders} />
    </main>
  );
}