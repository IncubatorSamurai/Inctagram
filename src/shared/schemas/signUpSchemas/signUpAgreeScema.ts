import { z } from 'zod'
      export const SignUpAgreeSchema = z.object({
        agree: z.boolean().refine((val) => val === true, {
          message: 'You must agree to the terms',
        }),
      });
      
      export type AgreeSchema = z.infer<typeof SignUpAgreeSchema>;