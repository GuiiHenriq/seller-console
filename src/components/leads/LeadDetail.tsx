import { useCallback, useState } from 'react';
import { Lead } from '../../types';
import { Button } from '../ui/Button';
import { SlideOver } from '../ui/SlideOver';
import { validateEmail } from '../../utils/helpers';
import { useOptimisticUpdate } from '../../hooks/useOptimisticUpdate';
import toast from 'react-hot-toast';
import { 
  BuildingOfficeIcon, 
  EnvelopeIcon, 
  ChartBarIcon, 
  TagIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

type LeadDetailProps = {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (leadId: string, updates: Partial<Lead>) => Promise<boolean>;
  onConvert: (lead: Lead, amount?: number) => Promise<boolean>;
};

export const LeadDetail = ({ lead, isOpen, onClose, onUpdate, onConvert }: LeadDetailProps) => {
  const [editableEmail, setEditableEmail] = useState(lead.email);
  const [editableStatus, setEditableStatus] = useState(lead.status);
  const [amount, setAmount] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (value: string) => {
    setEditableEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  const handleStatusChange = (value: Lead['status']) => {
    setEditableStatus(value);
  };

  const resetState = useCallback(() => {
    setEditableEmail(lead.email);
    setEditableStatus(lead.status);
    setIsEmailValid(true);
  }, [lead]);

  const { execute: executeSave, isUpdating: isSaving } = useOptimisticUpdate(
    async () => {
      if (!isEmailValid) {
        toast.error('Please enter a valid email address');
        return false;
      }

      try {
        const success = await onUpdate(lead.id, {
          email: editableEmail,
          status: editableStatus,
        });
        if (success) {
          toast.success('Lead updated successfully');
        }
        return success;
      } catch (error) {
        toast.error('Failed to update lead');
        return false;
      }
    },
    resetState
  );

  const { execute: executeConvert, isUpdating: isConverting } = useOptimisticUpdate(
    async () => {
      try {
        const amountValue = amount ? parseFloat(amount) : undefined;
        const success = await onConvert(lead, amountValue);
        if (success) {
          toast.success('Lead converted to opportunity');
          onClose();
        }
        return success;
      } catch (error) {
        toast.error('Failed to convert lead');
        return false;
      }
    },
    () => setAmount('')
  );

  const getStatusConfig = (status: Lead['status']) => {
    const configs = {
      new: {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        dot: 'bg-blue-500'
      },
      contacted: {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        dot: 'bg-amber-500'
      },
      qualified: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        dot: 'bg-emerald-500'
      },
      unqualified: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        dot: 'bg-red-500'
      }
    };
    return configs[status];
  };

  const statusConfig = getStatusConfig(editableStatus);

  return (
    <SlideOver title="Lead Details" open={isOpen} onClose={onClose}>
      <div className="space-y-2">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
              {lead.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{lead.name}</h3>
              <p className="text-sm text-gray-600 font-medium mt-1">{lead.company}</p>
              
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center space-x-2">
                  <BuildingOfficeIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Source:</span>
                  <span className="text-sm font-medium text-gray-900">{lead.source}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <ChartBarIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Score:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${(lead.score / 100) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{lead.score}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                >
                  <span className={`w-2 h-2 rounded-full ${statusConfig.dot} mr-2`}></span>
                  {editableStatus.charAt(0).toUpperCase() + editableStatus.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={editableEmail}
                onChange={(e) => handleEmailChange(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEmailValid 
                    ? 'border-red-300 bg-red-50 focus:ring-red-500' 
                    : 'border-gray-200 bg-gray-50 focus:bg-white'
                }`}
                placeholder="Enter email address"
              />
              {!isEmailValid && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {!isEmailValid && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                Please enter a valid email address
              </p>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
              <TagIcon className="h-5 w-5 text-gray-400 mr-2" />
              Lead Status
            </label>
            <div className="relative">
              <select
                value={editableStatus}
                onChange={(e) => handleStatusChange(e.target.value as Lead['status'])}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="unqualified">Unqualified</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>


          {editableStatus === 'qualified' && (
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200 p-6">
              <label className="flex items-center text-sm font-semibold text-emerald-700 mb-3">
                <CurrencyDollarIcon className="h-5 w-5 text-emerald-500 mr-2" />
                Opportunity Amount (Optional)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount in USD"
                  className="w-full px-4 py-3 rounded-xl border-2 border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-sm text-emerald-600 font-medium">USD</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-emerald-600">
                This lead is qualified and ready to be converted to an opportunity
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-col gap-3 pt-6 border-t border-gray-200">
          <Button 
            onClick={() => executeSave({})} 
            isLoading={isSaving}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold cursor-pointer"
          >
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            Save Changes
          </Button>
          {editableStatus === 'qualified' && (
            <Button
              variant="secondary"
              onClick={() => executeConvert({})}
              isLoading={isConverting}
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold cursor-pointer"
            >
              <CurrencyDollarIcon className="h-5 w-5 mr-2" />
              Convert to Opportunity
            </Button>
          )}
        </div>
      </div>
    </SlideOver>
  );
};
