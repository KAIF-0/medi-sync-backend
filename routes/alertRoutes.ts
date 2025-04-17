import { Hono } from "hono";
import { generateQR, getQRCode } from "../controllers/qrController";
import { userIdSchema } from "../helpers/userSchema";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { alertSchema } from "../helpers/alertSchema";
import {
  addAlert,
  deleteAlert,
  getAlerts,
} from "../controllers/alertController";

export const alertInstance = new Hono();

alertInstance.post(
  "/addAlert",
  zValidator("json", alertSchema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(400, {
        message: result?.error?.errors[0]?.message,
      });
    }
  }),
  addAlert
);
alertInstance.get("/getAlerts", getAlerts);

alertInstance.delete("/deleteAlert/:alertId", deleteAlert);
