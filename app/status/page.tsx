import prisma from '@/lib/prisma';
import { ServiceName, OperationalStatus } from '@prisma/client';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

// This forces the page to be re-fetched on every visit
export const dynamic = 'force-dynamic';

async function getStatusData() {
  // Seed the statuses just in case they haven't been created yet
  await prisma.serviceStatus.upsert({
    where: { serviceName: ServiceName.STUDIOS },
    update: {},
    create: { serviceName: ServiceName.STUDIOS, status: OperationalStatus.OPERATIONAL },
  });
  await prisma.serviceStatus.upsert({
    where: { serviceName: ServiceName.BLOG },
    update: {},
    create: { serviceName: ServiceName.BLOG, status: OperationalStatus.OPERATIONAL },
  });
  
  // Fetch all statuses
  const statuses = await prisma.serviceStatus.findMany({
    orderBy: { serviceName: 'asc' },
  });
  return statuses;
}

// Helper component for the status indicator
function StatusIndicator({ status }: { status: OperationalStatus }) {
  if (status === OperationalStatus.OPERATIONAL) {
    return (
      <div className="flex items-center gap-2">
        <CheckCircle className="h-6 w-6 text-green-500" />
        <span className="text-lg font-medium text-green-600 dark:text-green-400">
          Operational
        </span>
      </div>
    );
  }
  if (status === OperationalStatus.MAINTENANCE) {
    return (
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-6 w-6 text-yellow-500" />
        <span className="text-lg font-medium text-yellow-600 dark:text-yellow-400">
          Under Maintenance
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <XCircle className="h-6 w-6 text-red-500" />
      <span className="text-lg font-medium text-red-600 dark:text-red-400">
        Down
      </span>
    </div>
  );
}

// Helper to get a human-readable name
function getServiceName(name: ServiceName) {
  switch (name) {
    case 'STUDIOS':
      return 'PhotoBytes Studios';
    case 'BLOG':
      return 'PhotoBytes Blog';
    default:
      return name;
  }
}

export default async function StatusPage() {
  const services = await getStatusData();

  // Check overall status
  const allOperational = services.every(
    (s) => s.status === OperationalStatus.OPERATIONAL,
  );

  return (
    <main className="min-h-[calc(100vh-160px)] bg-gray-50 dark:bg-gray-900 py-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* --- Overall Status Box --- */}
        <div
          className={`rounded-lg p-6 shadow-lg mb-12 ${
            allOperational
              ? 'bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700'
              : 'bg-yellow-100 dark:bg-yellow-900/50 border border-yellow-300 dark:border-yellow-700'
          }`}
        >
          <div className="flex items-center gap-4">
            {allOperational ? (
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            ) : (
              <AlertTriangle className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {allOperational
                  ? 'All systems operational.'
                  : 'Some systems are experiencing issues.'}
              </h1>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Last updated:{' '}
                {new Date(services[0].updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* --- Individual Services List --- */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Individual Services
          </h2>
          <div className="rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-6"
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {getServiceName(service.serviceName)}
                </span>
                <StatusIndicator status={service.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}