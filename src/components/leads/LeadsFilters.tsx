import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
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

  const statusOptions: { label: string; value: Lead['status']; color: string }[] = [
    { label: 'New', value: 'new', color: 'blue' },
    { label: 'Contacted', value: 'contacted', color: 'amber' },
    { label: 'Qualified', value: 'qualified', color: 'emerald' },
    { label: 'Unqualified', value: 'unqualified', color: 'red' },
  ];

  const getStatusColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      amber: 'bg-amber-50 text-amber-700 border-amber-200',
      emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      red: 'bg-red-50 text-red-700 border-red-200',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="bg-white mb-3 rounded-2xl shadow-sm border-b border-gray-100">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search leads"
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              value={currentSearch}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-3 flex-col-reverse lg:flex-row">
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border-gray-200 hover:bg-gray-50 transition-all duration-200"
            >
              <FunnelIcon className="h-5 w-5" />
              Filters
              {currentStatuses.length > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
                  {currentStatuses.length}
                </span>
              )}
            </Button>

            <div className="relative">
              <select
                className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                value={`${currentSort.field}-${currentSort.direction}`}
                onChange={(e) => {
                  const [field, direction] = e.target.value.split('-');
                  onSort(field, direction as 'asc' | 'desc');
                }}
              >
                <option value="score-desc">Score (High to Low)</option>
                <option value="score-asc">Score (Low to High)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {isFilterOpen && (
          <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Filter by Status</h3>
              <button
                onClick={() => onStatusFilter([])}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Clear all
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {statusOptions.map((status) => {
                const isSelected = currentStatuses.includes(status.value);
                return (
                  <label
                    key={status.value}
                    className={`relative flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? getStatusColor(status.color) + ' border-opacity-100 shadow-sm'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isSelected}
                      onChange={(e) => {
                        const newStatuses = e.target.checked
                          ? [...currentStatuses, status.value]
                          : currentStatuses.filter((s) => s !== status.value);
                        onStatusFilter(newStatuses);
                      }}
                    />
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          isSelected
                            ? status.color === 'blue'
                              ? 'bg-blue-500'
                              : status.color === 'amber'
                                ? 'bg-amber-500'
                                : status.color === 'emerald'
                                  ? 'bg-emerald-500'
                                  : 'bg-red-500'
                            : 'bg-gray-300'
                        }`}
                      ></div>
                      <span
                        className={`text-sm font-medium ${
                          isSelected ? 'text-current' : 'text-gray-700'
                        }`}
                      >
                        {status.label}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <div className="w-2 h-2 bg-current rounded-full"></div>
                      </div>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
