import { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Lead } from '../../types';
import { Button } from '../ui/Button';

type LeadsFiltersProps = {
  onSearch: (search: string) => void;
  onStatusFilter: (statuses: string[]) => void;
  onSort: (field: string, direction: 'asc' | 'desc') => void;
  currentSearch: string;
  currentStatuses: string[];
  currentSort: { field: string; direction: 'asc' | 'desc' };
};

export const LeadsFilters = ({
  onSearch,
  onStatusFilter,
  onSort,
  currentSearch,
  currentStatuses,
  currentSort,
}: LeadsFiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const statusOptions: { label: string; value: Lead['status'] }[] = [
    { label: 'New', value: 'new' },
    { label: 'Contacted', value: 'contacted' },
    { label: 'Qualified', value: 'qualified' },
    { label: 'Unqualified', value: 'unqualified' },
  ];

  return (
    <div className="bg-white p-4 border-b">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={currentSearch}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2"
          >
            <FunnelIcon className="h-5 w-5" />
            Filters
          </Button>
          <select
            className="border rounded-md px-3 py-2 bg-white"
            value={`${currentSort.field}-${currentSort.direction}`}
            onChange={(e) => {
              const [field, direction] = e.target.value.split('-');
              onSort(field, direction as 'asc' | 'desc');
            }}
          >
            <option value="score-desc">Score (High to Low)</option>
            <option value="score-asc">Score (Low to High)</option>
          </select>
        </div>
      </div>

      {isFilterOpen && (
        <div className="mt-4 p-4 border rounded-md">
          <h3 className="font-medium mb-3">Filter by Status</h3>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((status) => (
              <label key={status.value} className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={currentStatuses.includes(status.value)}
                  onChange={(e) => {
                    const newStatuses = e.target.checked
                      ? [...currentStatuses, status.value]
                      : currentStatuses.filter((s) => s !== status.value);
                    onStatusFilter(newStatuses);
                  }}
                />
                <span className="ml-2 mr-4">{status.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
