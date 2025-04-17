import type { Context } from "hono";
import cloudinary from "../configs/cloudinary";
import { uploadMedicalRecord } from "../utils/recordUpload";
import { prisma } from "../configs/prisma";
import { HTTPException } from "hono/http-exception";

export const uploadRecord = async (c: Context) => {
  try {
    const {
      userId,
      fileName,
      file,
      testType,
      hospitalName,
      visitDate,
      description,
      isConfidential,
    } = c.req.valid("form");

    //uploading file to cloudinary
    const { fileUrl, fileType } = await uploadMedicalRecord(
      userId,
      fileName,
      file
    );

    const record = await prisma.medicalRecord.create({
      data: {
        fileName,
        fileType,
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
  } catch (err) {
    throw new HTTPException(500, {
      message:
        err instanceof Error
          ? err.message
          : " Failed to upload medical record!",
    });
  }
};

export const getRecords = async (c: Context) => {
  try {
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
  } catch (err) {
    throw new HTTPException(500, {
      message: err instanceof Error ? err.message : " Failed to fetch records!",
    });
  }
};

export const renameRecord = async (c: Context) => {
  try {
    const { recordId } = c.req.valid("param");
    const { updatedName } = c.req.valid("json");

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
  } catch (err) {
    throw new HTTPException(500, {
      message: err instanceof Error ? err.message : " Failed to rename record!",
    });
  }
};

export const deleteRecord = async (c: Context) => {
  try {
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
  } catch (err) {
    throw new HTTPException(500, {
      message: err instanceof Error ? err.message : " Failed to delete record!",
    });
  }
};
