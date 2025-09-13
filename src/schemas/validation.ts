import { z } from 'zod';

export const leadSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .max(255, 'Email must have at most 255 characters'),
  status: z.enum(['new', 'contacted', 'qualified', 'unqualified'], {
    message: 'Status is required',
  }),
  amount: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val === '') return true; // Optional field
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, 'Amount must be a positive number'),
});

export const convertToOpportunitySchema = z.object({
  amount: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val === '') return true; // Optional field
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, 'Amount must be a positive number'),
});

export type LeadFormData = z.infer<typeof leadSchema>;
export type ConvertToOpportunityFormData = z.infer<typeof convertToOpportunitySchema>;

export const validateEmail = (email: string): boolean => {
  try {
    leadSchema.shape.email.parse(email);
    return true;
  } catch {
    return false;
  }
};
