import { FilterState } from '../types';

const FILTER_STATE_KEY = 'seller_console_filter_state';

export const saveFilterState = (state: FilterState): void => {
  try {
    localStorage.setItem(FILTER_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving filter state:', error);
  }
};

export const loadFilterState = (): FilterState | null => {
  try {
    const state = localStorage.getItem(FILTER_STATE_KEY);
    return state ? JSON.parse(state) : null;
  } catch (error) {
    console.error('Error loading filter state:', error);
    return null;
  }
};
