import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient'; // Import the new Client Component

export default async function DashboardPage() {
  // 1. Get the session on the server
  const session = await auth();

  // 2. If no session, redirect to login
  if (!session || !session.user) {
    redirect('/login?callbackUrl=/dashboard');
  }

  // 3. Render the Client Component with the user data
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardClient user={session.user} />
    </main>
  );
}