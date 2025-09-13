import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SlideOver } from './SlideOver';

describe('SlideOver', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    open: true,
    onClose: mockOnClose,
    title: 'Test Title',
    children: <div>Test Content</div>,
  };

  it('renders the slide over with title and content', () => {
    render(<SlideOver {...defaultProps} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<SlideOver {...defaultProps} />);
    
    const closeButton = screen.getByRole('button', { name: /close panel/i });
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should not render content when closed', () => {
    render(<SlideOver {...defaultProps} open={false} />);
    
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });
});
