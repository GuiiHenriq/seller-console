import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OpportunitiesTable } from './OpportunitiesTable';
import { Opportunity } from '../../types';

const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    leadId: 'lead-1',
    name: 'Test Opportunity',
    accountName: 'Test Account',
    stage: 'discovery' as const,
    amount: 5000,
    createdAt: '2025-09-13',
  },
];

describe('OpportunitiesTable', () => {
  it('should render the opportunities table correctly', () => {
    render(<OpportunitiesTable opportunities={mockOpportunities} />);
    
    expect(screen.getByRole('heading', { name: 'Opportunities' })).toBeInTheDocument();
    expect(screen.getByText('1 opportunities found')).toBeInTheDocument();
    expect(screen.getAllByText('Test Opportunity')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Test Account')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Discovery')[0]).toBeInTheDocument();
    expect(screen.getAllByText('$5,000.00')[0]).toBeInTheDocument();
  });

  it('should handle opportunity click', () => {
    const onOpportunityClick = jest.fn();
    render(
      <OpportunitiesTable
        opportunities={mockOpportunities}
        onOpportunityClick={onOpportunityClick}
      />
    );

    const opportunityElement = screen.getAllByText('Test Opportunity')[0];
    fireEvent.click(opportunityElement);
    expect(onOpportunityClick).toHaveBeenCalledWith(mockOpportunities[0]);
  });

  it('should render loading state when hasMore is true', () => {
    render(<OpportunitiesTable opportunities={mockOpportunities} hasMore={true} />);
    expect(screen.getByText('Loading more opportunities...')).toBeInTheDocument();
  });
});
