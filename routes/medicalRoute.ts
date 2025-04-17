import { Hono } from "hono";
import {
  deleteRecord,
  getRecords,
  renameRecord,
  uploadRecord,
} from "../controllers/medicalController";
import { zValidator } from "@hono/zod-validator";
import {
  medicalRecordSchema,
  recordIdSchema,
  updatedRecordSchema,
} from "../helpers/recordSchema";
import { userIdSchema } from "../helpers/userSchema";
import { HTTPException } from "hono/http-exception";

export const medicalInstance = new Hono();

medicalInstance.post(
  "/uploadRecord",
  zValidator("form", medicalRecordSchema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(400, { message: result.error.message });
    }
  }),
  uploadRecord
);

medicalInstance.get(
  "/getRecord/:userId",
  zValidator("param", userIdSchema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(400, { message: result.error.message });
    }
  }),
  getRecords
);
medicalInstance.put(
  "/renameRecord/:recordId",
  zValidator("param", recordIdSchema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(400, {
        message: result?.error?.errors[0]?.message,
      });
    }
  }),
  zValidator("json", updatedRecordSchema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(400, {
        message: result?.error?.errors[0]?.message,
      });
    }
  }),
  renameRecord
);
medicalInstance.delete(
  "/deleteRecord/:recordId",
  zValidator("param", recordIdSchema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(400, {
        message: result?.error?.errors[0]?.message,
      });
    }
  }),
  deleteRecord
);
