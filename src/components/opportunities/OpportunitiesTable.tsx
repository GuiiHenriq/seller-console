import { Opportunity } from '../../types';

type OpportunitiesTableProps = {
  opportunities: Opportunity[];
};

export const OpportunitiesTable = ({ opportunities }: OpportunitiesTableProps) => {
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

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-lg font-semibold mb-4">Opportunities</h2>
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
              Account
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Stage
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Amount
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Created
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {opportunities.map((opportunity) => (
            <tr key={opportunity.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {opportunity.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {opportunity.accountName}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    {
                      discovery: 'bg-blue-100 text-blue-800',
                      proposal: 'bg-yellow-100 text-yellow-800',
                      negotiation: 'bg-purple-100 text-purple-800',
                      closed_won: 'bg-green-100 text-green-800',
                      closed_lost: 'bg-red-100 text-red-800',
                    }[opportunity.stage]
                  }`}
                >
                  {opportunity.stage.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {formatCurrency(opportunity.amount)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {formatDate(opportunity.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
