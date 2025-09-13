import { validateEmail, simulateApiCall } from './helpers';

describe('validateEmail', () => {
  it('should return true for valid email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user@domain.co')).toBe(true);
  });

  it('should return false for invalid email addresses', () => {
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('test@.com')).toBe(false);
    expect(validateEmail('')).toBe(false);
  });
});

describe('simulateApiCall', () => {
  it('should resolve with provided data on success', async () => {
    const testData = { id: 1, name: 'Test' };
    const result = await simulateApiCall(testData);
    expect(result).toEqual(testData);
  });

  it('should reject when shouldFail is true', async () => {
    const testData = { id: 1 };
    await expect(simulateApiCall(testData, true)).rejects.toThrow('Simulated API failure');
  });
});
