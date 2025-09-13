import { render, screen, fireEvent } from '@testing-library/react';
import { LeadsPage } from './LeadsPage';
import { useLeadsManager } from '../hooks/useLeadsManager';

jest.mock('../hooks/useLeadsManager');

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

window.IntersectionObserver = mockIntersectionObserver;

describe('LeadsPage', () => {
  const mockUseLeadsManager = useLeadsManager as jest.Mock;

  beforeEach(() => {
    mockUseLeadsManager.mockReturnValue({
      leads: [],
      loading: false,
      error: null,
      filterState: { search: '', status: [], sortBy: '', sortDirection: '' },
      fetchLeads: jest.fn(),
      updateFilters: jest.fn(),
      loadMoreLeads: jest.fn(),
      hasMore: true,
    });
  });

  it('renders loading state correctly', () => {
    mockUseLeadsManager.mockReturnValue({
      ...mockUseLeadsManager(),
      loading: true,
      leads: [],
    });

    render(<LeadsPage />);
    expect(screen.getByText('Loading leads...')).toBeInTheDocument();
  });

  it('renders error state with retry button', () => {
    const mockFetchLeads = jest.fn();
    mockUseLeadsManager.mockReturnValue({
      ...mockUseLeadsManager(),
      error: 'Failed to load leads',
      fetchLeads: mockFetchLeads,
    });

    render(<LeadsPage />);
    expect(screen.getByText('Failed to load leads')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Retry'));
    expect(mockFetchLeads).toHaveBeenCalled();
  });

  it('renders empty state when no leads are found', () => {
    mockUseLeadsManager.mockReturnValue({
      ...mockUseLeadsManager(),
      leads: [],
      loading: false,
    });

    render(<LeadsPage />);
    expect(screen.getByText('No leads found')).toBeInTheDocument();
  });

  it('renders leads table when data is available', () => {
    const mockLeads = [{
      id: '1',
      name: 'Test Lead',
      email: 'test@example.com',
      status: 'new',
      company: 'Test Company',
      source: 'Website',
      score: 85,
      createdAt: '2025-09-13',
      updatedAt: '2025-09-13'
    }];

    mockUseLeadsManager.mockReturnValue({
      ...mockUseLeadsManager(),
      leads: mockLeads,
    });

    render(<LeadsPage />);
    expect(screen.getByRole('cell', { name: /test lead/i })).toBeInTheDocument();
  });
});
