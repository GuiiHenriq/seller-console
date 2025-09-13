import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OpportunitiesPage } from './OpportunitiesPage';
import { useLeadsManager } from '../hooks/useLeadsManager';

jest.mock('../hooks/useLeadsManager');

describe('OpportunitiesPage', () => {
  it('should show loading state', () => {
    (useLeadsManager as jest.Mock).mockReturnValue({
      opportunities: [],
      loading: true,
      error: null,
      fetchLeads: jest.fn(),
    });

    render(<OpportunitiesPage />);
    expect(screen.getByText('Loading opportunities...')).toBeInTheDocument();
  });

  it('should show empty state when no opportunities', () => {
    (useLeadsManager as jest.Mock).mockReturnValue({
      opportunities: [],
      loading: false,
      error: null,
      fetchLeads: jest.fn(),
    });

    render(<OpportunitiesPage />);
    expect(screen.getByText('No opportunities found')).toBeInTheDocument();
  });

  it('should show error state and retry', async () => {
    const fetchLeads = jest.fn();
    (useLeadsManager as jest.Mock).mockReturnValue({
      opportunities: [],
      loading: false,
      error: 'Failed to load',
      fetchLeads,
    });

    render(<OpportunitiesPage />);
    
    const retryButton = screen.getByText('Retry');
    await userEvent.click(retryButton);
    
    expect(fetchLeads).toHaveBeenCalled();
  });
});
