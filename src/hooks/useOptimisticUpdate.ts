import { useCallback, useState } from 'react';

export const useOptimisticUpdate = <T>(
  updateFn: (data: T) => Promise<boolean>,
  rollbackFn: () => void
) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const execute = useCallback(
    async (data: T) => {
      setIsUpdating(true);
      try {
        const success = await updateFn(data);
        if (!success) {
          rollbackFn();
        }
        return success;
      } catch (error) {
        rollbackFn();
        throw error;
      } finally {
        setIsUpdating(false);
      }
    },
    [updateFn, rollbackFn]
  );

  return {
    execute,
    isUpdating,
  };
};
