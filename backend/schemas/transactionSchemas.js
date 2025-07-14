import { z } from 'zod';

export const transactionsValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.string({ required_error: "Amount is required" }),
  type: z.enum(["income", "expense"], {
    errorMap: () => ({ message: "Type must be income or expense" }),
  }),
  category: z.string().min(1, "Category is required"),
  
});
