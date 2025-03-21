import { z } from "zod";

export const userDetailsSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  phone: z.string().min(10).max(15),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date))), //date format me convert krdega
  addressDetails: z
    .object({
      address: z.string(),
      city: z.string(),
      state: z.string(),
      pinCode: z.string().length(6),
    })
    .optional(),
  aadhaarDetails: z
    .object({
      aadhaarNumber: z.string().length(12),
    })
    .optional(),
  medicalInformation: z
    .object({
      bloodGroup: z.enum([
        "A_POS",
        "A_NEG",
        "B_POS",
        "B_NEG",
        "AB_POS",
        "AB_NEG",
        "O_POS",
        "O_NEG",
      ]),
      allergies: z.array(z.string()).optional(),
      chronicConditions: z.array(z.string()).optional(),
      currentMedications: z.array(z.string()).optional(),
    })
    .optional(),
});

export const userIdSchema = z.object({
  userId: z.string().uuid(),
});
