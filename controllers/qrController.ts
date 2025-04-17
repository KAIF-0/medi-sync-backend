import type { Context } from "hono";
import QRCode from "qrcode";
import { uploadQrCode } from "../utils/qrCodeUpload";
import { prisma } from "../configs/prisma";
import { HTTPException } from "hono/http-exception";
import { Prisma } from "@prisma/client";
import { generateQrcCodeData } from "../utils/qrCodeData";

export const generateQR = async (c: Context) => {
  try {
    const { userId } = c.req.valid("json");

    //generate qr code
    const qrCodeData = `${Bun.env.FRONTEND_URL}/qr/${userId}`;

    const qrCodeBuffer = await QRCode.toBuffer(qrCodeData);

    //buffer to file
    const blob = new Blob([qrCodeBuffer], { type: "image/png" });
    const qrCode = new File([blob], `qrcode-${userId}-${Date.now()}.png`, {
      type: "image/png",
    });

    //upload qr code to cloudinary
    const qrCodeCloudinaryUrl = await uploadQrCode(qrCode as File);

    const qrData = await prisma.qRCode.create({
      data: {
        qrCodeData: qrCodeBuffer.toString("base64"),
        qrCodeUrl: qrCodeCloudinaryUrl,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        userId: userId,
      } as any,
    });

    return c.json({
      success: true,
      message: "QR code generated successfully!",
      data: qrData,
    });
  } catch (err) {
    throw new HTTPException(500, {
      message:
        err instanceof Error ? err.message : " Failed to generate QR code!",
    });
  }
};

export const getQRCode = async (c: Context) => {
  try {
    const { userId } = c.req.valid("param");

    const qrData = await prisma.qRCode.findUnique({
      where: {
        userId,
      },
    });
    if (!qrData) {
      throw new HTTPException(404, { message: "QR code not found!" });
    }

    return c.json({
      success: true,
      message: "QR code fetched successfully!",
      data: qrData,
    });
  } catch (err) {
    throw new HTTPException(500, {
      message: err instanceof Error ? err.message : " Failed to fetch QR code!",
    });
  }
};
