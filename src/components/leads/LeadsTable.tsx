import { useEffect, useRef } from 'react';
import { Lead } from '../../types';

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
  loading = false
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
      }
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
  return (
    <div className="overflow-x-auto">
        <h1>Leads</h1>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Name
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Company
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Email
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Source
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Score
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {leads.map((lead: Lead) => (
            <tr
              key={lead.id}
              onClick={() => onLeadClick(lead)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {lead.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{lead.company}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{lead.email}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{lead.source}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{lead.score}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    {
                      new: 'bg-blue-100 text-blue-800',
                      contacted: 'bg-yellow-100 text-yellow-800',
                      qualified: 'bg-green-100 text-green-800',
                      unqualified: 'bg-red-100 text-red-800',
                    }[lead.status]
                  }`}
                >
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasMore && (
        <div
          ref={loaderRef}
          className="flex items-center justify-center p-4 bg-transparent"
        >
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-blue-600 border-r-transparent"></div>
        </div>
      )}
    </div>
  );
};
