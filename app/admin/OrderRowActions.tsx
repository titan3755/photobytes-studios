'use client';

import { useState, useTransition } from 'react';
import { OrderStatus } from '@prisma/client';
import { updateOrderStatus } from '@/app/actions/adminActions';
import { toast } from 'sonner';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';

// --- Type for Admin Orders (with unread count) ---
type AdminOrder = {
  id: string;
  status: OrderStatus;
  _count: {
    messages: number;
  };
};

export default function OrderRowActions({ order }: { order: AdminOrder }) {
  const [isPending, startTransition] = useTransition();
  const [currentStatus, setCurrentStatus] = useState(order.status);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as OrderStatus;
    setCurrentStatus(newStatus);

    startTransition(async () => {
      const result = await updateOrderStatus(order.id, newStatus);
      if (result.success) {
        toast.success(`Order status updated.`);
      } else {
        toast.error(result.message);
        // Revert on failure
        setCurrentStatus(order.status);
      }
    });
  };

  return (
    <div className="flex items-center justify-end gap-3">
      {/* --- Message Button with Badge --- */}
      <Link
        href={`/admin/orders/${order.id}`}
        className="relative inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
        title="View Messages"
      >
        <MessageSquare className="h-4 w-4" />
        {order._count.messages > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-xs font-bold text-white">
            {order._count.messages}
          </span>
        )}
      </Link>

      {/* --- Status Dropdown --- */}
      <select
        value={currentStatus}
        onChange={handleStatusChange}
        disabled={isPending}
        className="rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm disabled:opacity-50"
      >
        <option value={OrderStatus.PENDING}>Pending</option>
        <option value={OrderStatus.IN_PROGRESS}>In Progress</option>
        <option value={OrderStatus.COMPLETED}>Completed</option>
        <option value={OrderStatus.CANCELLED}>Cancelled</option>
      </select>
    </div>
  );
}