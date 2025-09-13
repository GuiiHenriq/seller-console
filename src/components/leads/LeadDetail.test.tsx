import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LeadDetail } from './LeadDetail';
import { Lead } from '../../types';

const mockLead: Lead = {
  id: '1',
  name: 'John Doe',
  company: 'Test Corp',
  email: 'john@test.com',
  source: 'Website',
  score: 80,
  status: 'new',
};

const mockProps = {
  lead: mockLead,
  isOpen: true,
  onClose: jest.fn(),
  onUpdate: jest.fn(),
  onConvert: jest.fn(),
};

describe('LeadDetail', () => {
  it('should render lead information correctly', async () => {
    await act(async () => {
      render(<LeadDetail {...mockProps} />);
    });
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Test Corp')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@test.com')).toBeInTheDocument();
  });

  it('should handle email update', async () => {
    await act(async () => {
      render(<LeadDetail {...mockProps} />);
    });
    
    const emailInput = screen.getByDisplayValue('john@test.com');
    
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'new@test.com' } });
    });
    
    const saveButton = screen.getByText('Save Changes');
    
    await act(async () => {
      fireEvent.click(saveButton);
    });
    
    await waitFor(() => {
      expect(mockProps.onUpdate).toHaveBeenCalled();
    });
  });

  it('should show convert button only for qualified leads', async () => {
    const qualifiedLead: Lead = { ...mockLead, status: 'qualified' };
    
    await act(async () => {
      render(<LeadDetail {...mockProps} lead={qualifiedLead} />);
    });
    
    expect(screen.getByText('Convert to Opportunity')).toBeInTheDocument();
  });
});
