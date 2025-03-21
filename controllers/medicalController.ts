import type { Context } from "hono";
import cloudinary from "../configs/cloudinary";
import { uploadMedicalRecord } from "../utils/recordUpload";
import { prisma } from "../configs/prisma";
import { HTTPException } from "hono/http-exception";

export const uploadRecord = async (c: Context) => {
  const {
    userId,
    fileName,
    testType,
    hospitalName,
    visitDate,
    description,
    isConfidential,
  } = c.req.valid("json");

  //uploading file to cloudinary
  const fileUrl = await uploadMedicalRecord();
  //   console.log(fileUrl);

  const record = await prisma.medicalRecord.create({
    data: {
      fileName,
      testType,
      hospitalName,
      visitDate,
      fileUrl,
      description,
      isConfidential,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return c.json({
    success: true,
    message: "Record uploaded successfully!",
    data: record,
  });
};

export const getRecords = async (c: Context) => {
  const { userId } = c.req.valid("param");
  const records = await prisma.medicalRecord.findMany({
    where: {
      userId,
    },
  });
  return c.json({
    success: true,
    message: "All records fetched successfully!",
    data: records,
  });
};

export const renameRecord = async (c: Context) => {
  const { recordId } = c.req.valid("param");
  const { updatedName } = c.req.valid("json");

  console.log(recordId, updatedName);

  const record = await prisma.medicalRecord.update({
    where: {
      id: recordId,
    },
    data: {
      fileName: updatedName,
    },
  });

  return c.json({
    success: true,
    message: "Record renamed successfully!",
    data: record,
  });
};

export const deleteRecord = async (c: Context) => {
  const { recordId } = c.req.valid("param");

  const record = await prisma.medicalRecord.delete({
    where: {
      id: recordId,
    },
  });

  return c.json({
    success: true,
    message: "Record deleted successfully!",
    data: record,
  });
};
