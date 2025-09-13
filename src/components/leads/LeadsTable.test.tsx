import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LeadsTable } from './LeadsTable';
import { Lead } from '../../types';

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockImplementation((_callback) => {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  };
});
window.IntersectionObserver = mockIntersectionObserver;

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Doe',
    company: 'Acme Inc',
    email: 'john@acme.com',
    source: 'Website',
    score: 85,
    status: 'new'
  }
];

describe('LeadsTable', () => {
  const mockOnLeadClick = jest.fn();
  const mockOnLoadMore = jest.fn();

  it('renders leads table with data', () => {
    render(
      <LeadsTable
        leads={mockLeads}
        onLeadClick={mockOnLeadClick}
        hasMore={false}
        onLoadMore={mockOnLoadMore}
      />
    );

    expect(screen.getByRole('heading', { name: 'Leads' })).toBeInTheDocument();
    expect(screen.getAllByText('John Doe')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Acme Inc')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Website')[0]).toBeInTheDocument();
  });

  it('calls onLeadClick when a lead is clicked', () => {
    render(
      <LeadsTable
        leads={mockLeads}
        onLeadClick={mockOnLeadClick}
        hasMore={false}
        onLoadMore={mockOnLoadMore}
      />
    );

    // Click the first instance of John Doe (in the desktop view)
    const leadNameElements = screen.getAllByText('John Doe');
    fireEvent.click(leadNameElements[0]);
    expect(mockOnLeadClick).toHaveBeenCalledWith(mockLeads[0]);
  });

  it('shows loading state when hasMore is true', () => {
    render(
      <LeadsTable
        leads={mockLeads}
        onLeadClick={mockOnLeadClick}
        hasMore={true}
        onLoadMore={mockOnLoadMore}
      />
    );

    expect(screen.getByText('Loading more leads...')).toBeInTheDocument();
  });
});
