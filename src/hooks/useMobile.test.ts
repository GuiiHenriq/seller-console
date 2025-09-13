import { renderHook, act } from '@testing-library/react';
import { useMobile } from './useMobile';

describe('useMobile', () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
  });

  it('should return true when screen width is below breakpoint', () => {
    window.innerWidth = 500;
    
    const { result } = renderHook(() => useMobile());
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    
    expect(result.current).toBe(true);
  });

  it('should return false when screen width is above breakpoint', () => {
    window.innerWidth = 1024;
    
    const { result } = renderHook(() => useMobile());
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    
    expect(result.current).toBe(false);
  });
});
