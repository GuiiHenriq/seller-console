export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const simulateApiCall = <T>(data: T, shouldFail = false): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        if (shouldFail) {
          reject(new Error('Simulated API failure'));
        } else {
          resolve(data);
        }
      },
      Math.random() * 1200 + 800,
    ); // Random delay between 800-2000ms
  });
};
