import { z } from "zod";

export const medicalRecordSchema = z.object({
  userId: z.string().uuid(),
  fileName: z.string().min(1),
  testType: z.string().min(1),
  hospitalName: z.string().optional(),
  visitDate: z.string().refine((date) => !isNaN(Date.parse(date))), //date format me convert krdega
  description: z.string().optional(),
  isConfidential: z.boolean().default(false),
});

export const recordIdSchema = z.object({
  recordId: z.string().uuid(),
});

export const updatedRecordSchema = z.object({
  updatedName: z.string().min(1),
});
