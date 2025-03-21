import { Hono } from "hono";
import { emergencyContactSchema } from "../helpers/emergencySchema";
import { zValidator } from "@hono/zod-validator";
import {
  addContact,
  deleteContact,
  getContacts,
  updateContact,
} from "../controllers/emergencyController";

export const emergencyInstance = new Hono();

emergencyInstance.post(
  "/addContacts",
  zValidator("json", emergencyContactSchema),
  addContact
);

emergencyInstance.get("/getContacts/:userId", getContacts);
emergencyInstance.put("/updateContact", updateContact);
emergencyInstance.delete("/deleteContact/:contactId", deleteContact);
