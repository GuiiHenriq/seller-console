import { Opportunity } from '../../types';
import {
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ChartBarIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

type OpportunitiesTableProps = {
  opportunities: Opportunity[];
  onOpportunityClick?: (opportunity: Opportunity) => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
  loading?: boolean;
};

export const OpportunitiesTable = ({
  opportunities,
  onOpportunityClick,
  hasMore = false,
}: OpportunitiesTableProps) => {
  const formatCurrency = (amount?: number) => {
    if (!amount) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStageConfig = (stage: Opportunity['stage']) => {
    const configs = {
      discovery: {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        dot: 'bg-blue-500',
      },
      proposal: {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        dot: 'bg-amber-500',
      },
      negotiation: {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200',
        dot: 'bg-purple-500',
      },
      closed_won: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        dot: 'bg-emerald-500',
      },
      closed_lost: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        dot: 'bg-red-500',
      },
    };
    return configs[stage];
  };

  const handleRowClick = (opportunity: Opportunity) => {
    if (onOpportunityClick) {
      onOpportunityClick(opportunity);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-xl">
              <ChartBarIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Opportunities</h2>
              <p className="text-sm text-gray-500">{opportunities.length} opportunities found</p>
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
                  <span>Account</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <ChartBarIcon className="h-4 w-4" />
                  <span>Stage</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <CurrencyDollarIcon className="h-4 w-4" />
                  <span>Amount</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Created</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {opportunities.map((opportunity: Opportunity) => {
              const stageConfig = getStageConfig(opportunity.stage);
              return (
                <tr
                  key={opportunity.id}
                  onClick={() => handleRowClick(opportunity)}
                  className="group cursor-pointer hover:bg-gradient-to-r hover:from-green-50/30 hover:to-emerald-50/30 transition-all duration-200 ease-in-out"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
                          {opportunity.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                          {opportunity.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm text-gray-600 font-medium">{opportunity.accountName}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${stageConfig.bg} ${stageConfig.text} ${stageConfig.border}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${stageConfig.dot} mr-2`}></span>
                      {opportunity.stage
                        .split('_')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-semibold text-gray-900">
                      {formatCurrency(opportunity.amount)}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm text-gray-500">{formatDate(opportunity.createdAt)}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden">
        <div className="space-y-3 p-4">
          {opportunities.map((opportunity: Opportunity) => {
            const stageConfig = getStageConfig(opportunity.stage);
            return (
              <div
                key={opportunity.id}
                onClick={() => handleRowClick(opportunity)}
                className="group cursor-pointer bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-green-200 transition-all duration-200 ease-in-out"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-lg">
                      {opportunity.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                          {opportunity.name}
                        </h3>
                        <p className="text-sm text-gray-600 font-medium mt-1">
                          {opportunity.accountName}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          {formatCurrency(opportunity.amount)}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${stageConfig.bg} ${stageConfig.text} ${stageConfig.border}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${stageConfig.dot} mr-1.5`}
                          ></span>
                          {opportunity.stage
                            .split('_')
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-sm text-gray-500">{formatDate(opportunity.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {hasMore && (
        <div className="flex items-center justify-center py-8 bg-gray-50/50">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 border-4 border-green-200 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-8 h-8 border-4 border-transparent border-t-green-600 rounded-full animate-spin"></div>
            </div>
            <span className="text-sm text-gray-600 font-medium">Loading more opportunities...</span>
          </div>
        </div>
      )}
    </div>
  );
};
