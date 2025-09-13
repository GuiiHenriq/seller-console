import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LeadsFilters } from './LeadsFilters';

describe('LeadsFilters', () => {
  const defaultProps = {
    onSearch: jest.fn(),
    onStatusFilter: jest.fn(),
    onSort: jest.fn(),
    currentSearch: '',
    currentStatuses: [],
    currentSort: { field: 'score', direction: 'desc' as const },
  };

  it('renders basic filter elements', () => {
    render(<LeadsFilters {...defaultProps} />);
    
    expect(screen.getByPlaceholderText('Search leads')).toBeInTheDocument();
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('handles search input changes', () => {
    render(<LeadsFilters {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search leads');
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    
    expect(defaultProps.onSearch).toHaveBeenCalledWith('test search');
  });

  it('shows status filters when filter button is clicked', () => {
    render(<LeadsFilters {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Filters'));
    
    expect(screen.getByText('Filter by Status')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('Qualified')).toBeInTheDocument();
  });
});
