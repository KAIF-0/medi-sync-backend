import cloudinary from "../configs/cloudinary";

export const uploadQrCode = async (qrCodeBuffer: any): Promise<string> => {
  try {
    //upload qr code to cloudinary with qrbuffer
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "qr_codes", resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(qrCodeBuffer);
    });
    if (!uploadResponse) {
      throw new Error("Failed to upload QR code");
    }

    // console.log(uploadResponse?.secure_url);

    return uploadResponse?.secure_url;
  } catch (error) {
    throw new Error("Failed to upload QR code");
  }
};
