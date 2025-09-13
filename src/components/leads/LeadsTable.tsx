import { useEffect, useRef } from 'react';
import { Lead } from '../../types';
import {
  UserIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

type LeadsTableProps = {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
  hasMore: boolean;
  onLoadMore: () => void;
  loading?: boolean;
};

export const LeadsTable = ({
  leads,
  onLeadClick,
  hasMore,
  onLoadMore,
  loading = false,
}: LeadsTableProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin: '20px',
        threshold: 0.1,
      },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, loading, onLoadMore]);

  const getStatusConfig = (status: Lead['status']) => {
    const configs = {
      new: {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        dot: 'bg-blue-500',
      },
      contacted: {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        dot: 'bg-amber-500',
      },
      qualified: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        dot: 'bg-emerald-500',
      },
      unqualified: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        dot: 'bg-red-500',
      },
    };
    return configs[status];
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <UserIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Leads</h2>
              <p className="text-sm text-gray-500">{leads.length} leads found</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-4 w-4" />
                  <span>Name</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <BuildingOfficeIcon className="h-4 w-4" />
                  <span>Company</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <EnvelopeIcon className="h-4 w-4" />
                  <span>Email</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Source
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <ChartBarIcon className="h-4 w-4" />
                  <span>Score</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead: Lead) => {
              const statusConfig = getStatusConfig(lead.status);
              return (
                <tr
                  key={lead.id}
                  onClick={() => onLeadClick(lead)}
                  className="group cursor-pointer hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-all duration-200 ease-in-out"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                          {lead.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {lead.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm text-gray-600 font-medium">{lead.company}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm text-gray-500">{lead.email}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(lead.score / 100) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700 min-w-[2rem] text-right">
                        {lead.score}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${statusConfig.dot} mr-2`}></span>
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden">
        <div className="space-y-3 p-4">
          {leads.map((lead: Lead) => {
            const statusConfig = getStatusConfig(lead.status);
            return (
              <div
                key={lead.id}
                onClick={() => onLeadClick(lead)}
                className="group cursor-pointer bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-blue-200 transition-all duration-200 ease-in-out"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {lead.name}
                        </h3>
                        <p className="text-sm text-gray-600 font-medium mt-1">{lead.company}</p>
                        <p className="text-sm text-gray-500 mt-1 truncate">{lead.email}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} mr-1.5`}
                          ></span>
                          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 w-fit">
                        {lead.source}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 sm:flex-none sm:w-16 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${(lead.score / 100) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                          {lead.score}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {hasMore && (
        <div ref={loaderRef} className="flex items-center justify-center py-8 bg-gray-50/50">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-8 h-8 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <span className="text-sm text-gray-600 font-medium">Loading more leads...</span>
          </div>
        </div>
      )}
    </div>
  );
};
