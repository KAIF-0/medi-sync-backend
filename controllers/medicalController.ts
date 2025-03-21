import type { Context } from "hono";
import cloudinary from "../configs/cloudinary";
import { uploadMedicalRecord } from "../utils/recordUpload";
import { prisma } from "../configs/prisma";
import { HTTPException } from "hono/http-exception";

export const uploadRecord = async (c: Context) => {
  const data = c.req.valid("json");

  //uploading file to cloudinary
  const fileUrl = await uploadMedicalRecord();
  console.log(data);

  const {
    userId,
    fileName,
    testType,
    hospitalName,
    visitDate,
    description,
    isConfidential,
  } = data;

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
  const userId = c.req.param("userId");
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
  const data = await c.req.json();
  const { recordId, updatedName } = data;

  if (!recordId || !updatedName) {
    throw new HTTPException(400, {
      message: "Record Id and updated name are required!",
    });
  }

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
  const recordId = c.req.param("recordId");
  if (!recordId) {
    throw new HTTPException(400, { message: "Record Id is required!" });
  }

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
