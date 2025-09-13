import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Sidebar } from './Sidebar';
import { BrowserRouter } from 'react-router-dom';
import * as MobileHook from '../../hooks/useMobile';

// Mock do hook useMobile
jest.mock('../../hooks/useMobile');
const useMobileMock = MobileHook.useMobile as jest.Mock;

const renderSidebar = () => {
  return render(
    <BrowserRouter>
      <Sidebar />
    </BrowserRouter>
  );
};

describe('Sidebar', () => {
  it('renders desktop version with main elements', () => {
    useMobileMock.mockReturnValue(false);
    renderSidebar();

    expect(screen.getByText('Seller Console')).toBeInTheDocument();
    expect(screen.getByText('Leads')).toBeInTheDocument();
    expect(screen.getByText('Opportunities')).toBeInTheDocument();
  });

  it('renders mobile version', () => {
    useMobileMock.mockReturnValue(true);
    renderSidebar();

    const mobileNav = screen.getByRole('navigation');
    expect(mobileNav).toHaveClass('flex space-x-1');
  });

  it('has correct navigation links', () => {
    useMobileMock.mockReturnValue(false);
    renderSidebar();

    const leadsLink = screen.getByRole('link', { name: /leads/i });
    const opportunitiesLink = screen.getByRole('link', { name: /opportunities/i });

    expect(leadsLink).toHaveAttribute('href', '/leads');
    expect(opportunitiesLink).toHaveAttribute('href', '/opportunities');
  });
});
