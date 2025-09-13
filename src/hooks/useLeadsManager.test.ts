import { renderHook, act } from '@testing-library/react';
import { useLeadsManager } from './useLeadsManager';
import { mockLeads } from '../data/mockData';

jest.mock('../utils/helpers', () => ({
  simulateApiCall: jest.fn().mockImplementation((data) => Promise.resolve(data)),
}));

describe('useLeadsManager', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useLeadsManager());
    
    expect(result.current.leads).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should fetch and display leads sorted by score', async () => {
    const { result } = renderHook(() => useLeadsManager());

    await act(async () => {
      await result.current.fetchLeads();
    });

    const sortedMockLeads = [...mockLeads].sort((a, b) => b.score - a.score).slice(0, 20);
    expect(result.current.leads).toEqual(sortedMockLeads);
    expect(result.current.loading).toBe(false);
  });

  it('should update filters and filter leads', async () => {
    const { result } = renderHook(() => useLeadsManager());
    
    await act(async () => {
      await result.current.fetchLeads();
      result.current.updateFilters({ search: 'Test Company' });
    });

    expect(result.current.filterState.search).toBe('Test Company');
  });
});
