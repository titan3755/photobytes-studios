'use client';

import { useState, useTransition } from 'react';
import { type ServiceStatus, ServiceName, OperationalStatus } from '@prisma/client';
import { updateServiceStatus } from '@/app/actions/adminActions';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface StatusManagerProps {
  services: ServiceStatus[];
}

export default function StatusManager({ services }: StatusManagerProps) {
  return (
    <div className="space-y-6">
      {services.map((service) => (
        <ServiceRow key={service.id} service={service} />
      ))}
    </div>
  );
}

function ServiceRow({ service }: { service: ServiceStatus }) {
  const [isPending, startTransition] = useTransition();
  const [currentStatus, setCurrentStatus] = useState(service.status);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as OperationalStatus;
    setCurrentStatus(newStatus);

    startTransition(async () => {
      const result = await updateServiceStatus(service.serviceName, newStatus);
      if (result.success) {
        toast.success(`${service.serviceName} status set to ${newStatus}.`);
      } else {
        toast.error(result.message);
        setCurrentStatus(service.status); // Revert on failure
      }
    });
  };
  
  const getServiceName = (name: ServiceName) => {
    switch (name) {
      case 'STUDIOS': return 'PhotoBytes Studios';
      case 'BLOG': return 'PhotoBytes Blog';
      default: return name;
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center gap-3">
        {isPending ? (
           <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
        ) : (
          <StatusDot status={currentStatus} />
        )}
        <span className="font-medium text-gray-900 dark:text-white">
          {getServiceName(service.serviceName)}
        </span>
      </div>
      <div className="mt-3 sm:mt-0">
        <select
          value={currentStatus}
          onChange={handleStatusChange}
          disabled={isPending}
          className="rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
        >
          <option value={OperationalStatus.OPERATIONAL}>Operational</option>
          <option value={OperationalStatus.MAINTENANCE}>Maintenance</option>
          <option value={OperationalStatus.DOWN}>Down</option>
        </select>
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: OperationalStatus }) {
  let color = 'bg-gray-400';
  if (status === 'OPERATIONAL') color = 'bg-green-500';
  if (status === 'MAINTENANCE') color = 'bg-yellow-500';
  if (status === 'DOWN') color = 'bg-red-500';

  return (
    <div className="relative flex h-5 w-5 items-center justify-center">
      <span
        className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-75`}
      />
      <span className={`relative inline-flex h-3 w-3 rounded-full ${color}`} />
    </div>
  );
}