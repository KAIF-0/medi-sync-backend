import { Hono } from "hono";
import {
  contactIdSchema,
  emergencyContactSchema,
  updatedContactSchema,
} from "../helpers/emergencySchema";
import { zValidator } from "@hono/zod-validator";
import {
  addContact,
  deleteContact,
  getContacts,
  updateContact,
} from "../controllers/emergencyController";
import { userIdSchema } from "../helpers/userSchema";
import { HTTPException } from "hono/http-exception";

export const emergencyInstance = new Hono();

emergencyInstance.post(
  "/addContact",
  zValidator("json", emergencyContactSchema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(400, {
        message: result?.error?.errors[0]?.message,
      });
    }
  }),
  addContact
);

emergencyInstance.get(
  "/getContacts/:userId",
  zValidator("param", userIdSchema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(400, {
        message: result?.error?.errors[0]?.message,
      });
    }
  }),
  getContacts
);

emergencyInstance.put(
  "/updateContact/:contactId",
  zValidator("param", contactIdSchema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(400, {
        message: result?.error?.errors[0]?.message,
      });
    }
  }),
  zValidator("json", updatedContactSchema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(400, {
        message: result?.error?.errors[0]?.message,
      });
    }
  }),
  updateContact
);

emergencyInstance.delete(
  "/deleteContact/:contactId",
  zValidator("param", contactIdSchema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(400, {
        message: result?.error?.errors[0]?.message,
      });
    }
  }),
  deleteContact
);
