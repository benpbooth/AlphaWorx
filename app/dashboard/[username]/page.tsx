import { getUserData } from '@/lib/redis';
import 'server-only';
import AnalyticsDashboard from './analytics-dashboard';
import Link from 'next/link';

interface DashboardPageProps {
  params: Promise<{ username: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { username } = await params;
  const userData = await getUserData(username);

  if (!userData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-red-50 to-white p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">User Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">
            The user "{username}" doesn't exist or hasn't been created yet.
          </p>
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go back to login
          </Link>
        </div>
      </div>
    );
  }

  // No external API calls in the simplified version
  const stats = null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {userData.username} Analytics Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Call analytics and performance metrics
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Back to Home
              </Link>
              <Link
                href="/login"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnalyticsDashboard userData={userData} stats={stats ?? undefined} />
      </div>
    </div>
  );
}



