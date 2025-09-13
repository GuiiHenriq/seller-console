import { useEffect, useState } from 'react';
import { Lead } from '../types';
import { useLeadsManager } from '../hooks/useLeadsManager';
import { LeadsFilters } from '../components/leads/LeadsFilters';
import { LeadsTable } from '../components/leads/LeadsTable';
import { LeadDetail } from '../components/leads/LeadDetail';
import { UsersIcon } from '@heroicons/react/24/outline';

export function LeadsPage() {
  const {
    leads,
    loading,
    error,
    filterState,
    fetchLeads,
    updateLead,
    convertToOpportunity,
    updateFilters,
    loadMoreLeads,
    hasMore,
  } = useLeadsManager();

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

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
        <div className="space-y-0">
          <LeadsFilters
            onSearch={(search) => updateFilters({ search })}
            onStatusFilter={(status) => updateFilters({ status })}
            onSort={(field, direction) =>
              updateFilters({ sortBy: field, sortDirection: direction })
            }
            currentSearch={filterState.search}
            currentStatuses={filterState.status}
            currentSort={{
              field: filterState.sortBy,
              direction: filterState.sortDirection,
            }}
          />

          {loading && leads.length === 0 ? (
            <div className="bg-white rounded-b-2xl shadow-lg border border-gray-100 p-12 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin"></div>
                  <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Loading leads...</h3>
                  <p className="text-sm text-gray-500 mt-1">Please wait while we fetch the data</p>
                </div>
              </div>
            </div>
          ) : !loading && leads.length === 0 ? (
            <div className="bg-white rounded-b-2xl shadow-lg border border-gray-100 p-12 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  <UsersIcon className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">No leads found</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <LeadsTable
              leads={leads}
              onLeadClick={setSelectedLead}
              hasMore={hasMore}
              onLoadMore={loadMoreLeads}
              loading={loading}
            />
          )}
        </div>
      </div>

      {selectedLead && (
        <LeadDetail
          lead={selectedLead}
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={updateLead}
          onConvert={convertToOpportunity}
        />
      )}
    </div>
  );
}
