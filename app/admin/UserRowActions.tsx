'use client';

import { useState, useTransition } from 'react';
import { Role } from '@prisma/client';
import { updateUserRole, deleteUser } from '@/app/actions/adminActions';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

// Define the shape of the user prop
type AdminUser = {
  id: string;
  role: Role;
  email: string | null;
};

interface UserRowActionsProps {
  user: AdminUser;
  currentAdminId: string;
}

export default function UserRowActions({
  user,
  currentAdminId,
}: UserRowActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [currentRole, setCurrentRole] = useState(user.role);

  // Check if the user is the currently logged-in admin
  const isCurrentUser = user.id === currentAdminId;

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as Role;
    setCurrentRole(newRole);

    startTransition(async () => {
      const result = await updateUserRole(user.id, newRole);
      if (result.success) {
        toast.success(`User role updated to ${newRole}.`);
      } else {
        toast.error(result.message);
        setCurrentRole(user.role); // Revert on failure
      }
    });
  };

  const handleDelete = () => {
    if (
      !confirm(
        `Are you sure you want to delete this user (${
          user.email || user.id
        })? This is permanent.`,
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await deleteUser(user.id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="flex items-center justify-end gap-3">
      <select
        value={currentRole}
        onChange={handleRoleChange}
        disabled={isPending || isCurrentUser}
        className="rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value={Role.USER}>User</option>
        <option value={Role.BLOGGER}>Blogger</option>
        <option value={Role.ADMIN}>Admin</option>
      </select>
      <button
        onClick={handleDelete}
        disabled={isPending || isCurrentUser}
        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Delete User"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
