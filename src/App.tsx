import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Lead } from './types';
import { useLeadsManager } from './hooks/useLeadsManager';
import { LeadsFilters } from './components/leads/LeadsFilters';
import { LeadsTable } from './components/leads/LeadsTable';
import { LeadDetail } from './components/leads/LeadDetail';
import { OpportunitiesTable } from './components/opportunities/OpportunitiesTable';
import {
  ChartBarIcon,
  HomeIcon,
  UsersIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Leads', href: '#', icon: UsersIcon, current: false },
  { name: 'Opportunities', href: '#', icon: ChartBarIcon, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function App() {
  const {
    leads,
    opportunities,
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div>
      <Toaster position="top-right" />
      <div className="flex h-screen overflow-hidden bg-gray-100">
        <div className="flex w-0 flex-1 flex-col overflow-hidden">

          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <div className="rounded-lg bg-white shadow">
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
                    <div className="p-8 text-center">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                      <p className="mt-2 text-sm text-gray-600">Loading leads...</p>
                    </div>
                  ) : !loading && leads.length === 0 ? (
                    <div className="text-center py-12">
                      <h3 className="mt-2 text-sm font-semibold text-gray-900">No leads found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Try adjusting your search or filter criteria
                      </p>
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

                {opportunities.length > 0 && (
                  <div className="mt-8 rounded-lg bg-white shadow">
                    <OpportunitiesTable opportunities={opportunities} />
                  </div>
                )}
              </div>
            </div>
          </main>
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

export default App;
