import { renderHook, act } from '@testing-library/react';
import { useOptimisticUpdate } from './useOptimisticUpdate';

describe('useOptimisticUpdate', () => {
  it('should handle successful update', async () => {
    const updateFn = jest.fn().mockResolvedValue(true);
    const rollbackFn = jest.fn();

    const { result } = renderHook(() => useOptimisticUpdate(updateFn, rollbackFn));

    expect(result.current.isUpdating).toBe(false);

    const data = { id: 1, name: 'Test' };
    await act(async () => {
      await result.current.execute(data);
    });

    expect(updateFn).toHaveBeenCalledWith(data);
    expect(rollbackFn).not.toHaveBeenCalled();
  });

  it('should handle failed update and call rollback', async () => {
    const updateFn = jest.fn().mockResolvedValue(false);
    const rollbackFn = jest.fn();

    const { result } = renderHook(() => useOptimisticUpdate(updateFn, rollbackFn));

    const data = { id: 1, name: 'Test' };
    await act(async () => {
      await result.current.execute(data);
    });

    expect(rollbackFn).toHaveBeenCalled();
  });
});
