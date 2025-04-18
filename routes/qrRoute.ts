import { Hono } from "hono";
import { generateQR, getQRCode } from "../controllers/qrController";
import { userIdSchema } from "../helpers/userSchema";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";

export const qrInstance = new Hono();

qrInstance.post(
  "/generate",
  zValidator("json", userIdSchema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(400, {
        message: result?.error?.errors[0]?.message,
      });
    }
  }),
  generateQR
);
qrInstance.get(
  "/:userId",
  zValidator("param", userIdSchema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(400, {
        message: result?.error?.errors[0]?.message,
      });
    }
  }),
  getQRCode
);
