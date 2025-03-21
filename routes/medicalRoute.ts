import { Hono } from "hono";
import {
  deleteRecord,
  getRecords,
  renameRecord,
  uploadRecord,
} from "../controllers/medicalController";
import { zValidator } from "@hono/zod-validator";
import { medicalRecordSchema } from "../helpers/recordSchema";

export const medicalInstance = new Hono();

medicalInstance.post(
  "/uploadRecord",
  zValidator("json", medicalRecordSchema),
  uploadRecord
);

medicalInstance.get("/getRecord/:userId", getRecords);
medicalInstance.put("/renameRecord", renameRecord);
medicalInstance.delete("/deleteRecord/:recordId", deleteRecord);
