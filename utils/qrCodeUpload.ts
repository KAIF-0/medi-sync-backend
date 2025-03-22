import { ID } from "appwrite";
import { storage } from "../configs/appwrite";
import cloudinary from "../configs/cloudinary";

export const uploadQrCode = async (qrCode: File): Promise<string> => {
  try {
    //upload qr code to cloudinary with qrbuffer
    const uploadResponse = await storage.createFile(
      Bun.env.APPWRITE_QR_CODES_BUCKET_ID!,
      ID.unique(),
      qrCode
    );
    if (!uploadResponse) {
      throw new Error("Failed to upload QR code");
    }

    const qrCodeUrl = `${Bun.env.APPWRITE_ENDPOINT}/storage/buckets/${Bun.env.APPWRITE_QR_CODES_BUCKET_ID}/files/${uploadResponse.$id}/view?project=${Bun.env.APPWRITE_PROJECT_ID}`;
    console.log(qrCodeUrl);

    return qrCodeUrl;
  } catch (error) {
    throw new Error("Failed to upload QR code");
  }
};
