'use client';

import { useTransition } from 'react';
import { markMessageAsRead, deleteMessage } from '@/app/actions/adminActions';
import { toast } from 'sonner';
import { Eye, Trash2 } from 'lucide-react';
import { type ContactMessage } from '@prisma/client';

export default function MessageRowActions({
  message,
}: {
  message: ContactMessage;
}) {
  const [isPending, startTransition] = useTransition();

  const handleMarkAsRead = () => {
    if (message.isRead) return;
    startTransition(async () => {
      const result = await markMessageAsRead(message.id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleDelete = () => {
    if (
      !confirm(
        'Are you sure you want to delete this message? This action is permanent.',
      )
    ) {
      return;
    }
    startTransition(async () => {
      const result = await deleteMessage(message.id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="flex items-center justify-end gap-3">
      {!message.isRead && (
        <button
          onClick={handleMarkAsRead}
          disabled={isPending}
          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50"
          title="Mark as Read"
        >
          <Eye className="h-4 w-4" />
        </button>
      )}
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}