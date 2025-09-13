import { useCallback, useState } from 'react';
import { Lead } from '../../types';
import { Button } from '../ui/Button';
import { SlideOver } from '../ui/SlideOver';
import { validateEmail } from '../../utils/helpers';
import { useOptimisticUpdate } from '../../hooks/useOptimisticUpdate';
import toast from 'react-hot-toast';

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

  return (
    <SlideOver title="Lead Details" open={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{lead.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{lead.company}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={editableEmail}
              onChange={(e) => handleEmailChange(e.target.value)}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                !isEmailValid ? 'border-red-500' : ''
              }`}
            />
            {!isEmailValid && (
              <p className="mt-1 text-sm text-red-600">Please enter a valid email address</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={editableStatus}
              onChange={(e) => handleStatusChange(e.target.value as Lead['status'])}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="unqualified">Unqualified</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Source</label>
            <p className="mt-1 text-sm text-gray-900">{lead.source}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Score</label>
            <p className="mt-1 text-sm text-gray-900">{lead.score}</p>
          </div>

          {editableStatus === 'qualified' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Opportunity Amount (Optional)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <Button onClick={() => executeSave({})} isLoading={isSaving}>
            Save Changes
          </Button>
          {editableStatus === 'qualified' && (
            <Button
              variant="secondary"
              onClick={() => executeConvert({})}
              isLoading={isConverting}
            >
              Convert to Opportunity
            </Button>
          )}
        </div>
      </div>
    </SlideOver>
  );
};
