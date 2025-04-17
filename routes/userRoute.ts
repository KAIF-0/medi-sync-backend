import { Hono } from "hono";
import { getUser, registerUser } from "../controllers/userController";
import {
  userDetailsSchema,
  userIdSchema,
  userKeySchema,
} from "../helpers/userSchema";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";

export const userInstance = new Hono();

userInstance.post(
  "/register",
  zValidator("json", userDetailsSchema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(400, { message: result?.error?.errors[0]?.message });
    }
  }),
  registerUser
);
userInstance.get(
  "/:userId",
  zValidator("param", userIdSchema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(400, { message: result?.error?.errors[0]?.message });
    }
  }),
  getUser
);
