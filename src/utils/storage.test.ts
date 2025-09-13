import { saveFilterState, loadFilterState } from './storage';
import { FilterState } from '../types';

describe('Storage Utils', () => {
  const mockFilterState: FilterState = {
    search: 'test',
    status: ['new'],
    sortBy: 'name',
    sortDirection: 'asc'
  };

  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should save and load filter state', () => {
    saveFilterState(mockFilterState);
    const loadedState = loadFilterState();
    expect(loadedState).toEqual(mockFilterState);
  });

  it('should return null when no state is saved', () => {
    const loadedState = loadFilterState();
    expect(loadedState).toBeNull();
  });

  it('should handle storage errors gracefully', () => {
    const mockSetItem = jest.fn().mockImplementation(() => {
      throw new Error('Storage error');
    });
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: mockSetItem
      }
    });
    
    saveFilterState(mockFilterState);
    expect(console.error).toHaveBeenCalled();
  });
});
