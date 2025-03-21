import { z } from "zod";

export const emergencyContactSchema = z.object({
  userId: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  relationship: z.string().optional(),
  phone: z.string().min(10).max(15),
  email: z.string().email().optional(),
  isNotificationEnabled: z.boolean().default(false),
});

export const contactIdSchema = z.object({
  contactId: z.string().uuid(),
});

export const updatedContactSchema = z.object({
  updatedName: z.string().min(1),
  updatedphone: z.string().min(10).max(15),
  updatedemail: z.string().email().optional(),
});
