import { useEffect } from 'react';
import { useLeadsManager } from '../hooks/useLeadsManager';
import { OpportunitiesTable } from '../components/opportunities/OpportunitiesTable';
import { ChartBarIcon } from '@heroicons/react/24/outline';

export function OpportunitiesPage() {
  const {
    opportunities,
    loading,
    error,
    fetchLeads,
  } = useLeadsManager();

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => fetchLeads()}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="space-y-6">
          {loading ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-green-200 rounded-full animate-spin"></div>
                  <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-green-600 rounded-full animate-spin"></div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Loading opportunities...</h3>
                  <p className="text-sm text-gray-500 mt-1">Please wait while we fetch the data</p>
                </div>
              </div>
            </div>
          ) : opportunities.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  <ChartBarIcon className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">No opportunities found</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Convert leads to opportunities to see them here
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <OpportunitiesTable opportunities={opportunities} />
          )}
        </div>
      </div>
    </div>
  );
}