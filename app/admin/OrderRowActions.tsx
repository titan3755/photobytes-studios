'use client';

import { useState, useTransition } from 'react';
import { OrderStatus, type Order } from '@prisma/client';
import { updateOrderStatus } from '@/app/actions/adminActions';
import { toast } from 'sonner'; // Using sonner for toasts

export default function OrderRowActions({ order }: { order: Order }) {
  const [isPending, startTransition] = useTransition();
  const [currentStatus, setCurrentStatus] = useState(order.status);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as OrderStatus;
    setCurrentStatus(newStatus);

    startTransition(async () => {
      const result = await updateOrderStatus(order.id, newStatus);
      if (result.success) {
        toast.success(`Order #${order.id.slice(0, 6)}... status updated.`);
      } else {
        toast.error(result.message);
        // Revert on failure
        setCurrentStatus(order.status);
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={currentStatus}
        onChange={handleStatusChange}
        disabled={isPending}
        className="rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
      >
        <option value={OrderStatus.PENDING}>Pending</option>
        <option value={OrderStatus.IN_PROGRESS}>In Progress</option>
        <option value={OrderStatus.COMPLETED}>Completed</option>
        <option value={OrderStatus.CANCELLED}>Cancelled</option>
      </select>
    </div>
  );
}