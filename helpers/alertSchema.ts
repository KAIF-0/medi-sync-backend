import { z } from "zod";

export const alertSchema = z.object({
  userId: z
    .string({ message: "User ID is required" })
    .min(1, "User ID is required"),
  latitude: z.number({ message: "Latitude is required" }),
  longitude: z.number({ message: "Longitude is required" }),
});
