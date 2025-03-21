import type { Context } from "hono";
import { prisma } from "../configs/prisma";
import { hashAadhaar } from "../utils/aadhaarHash";
import { HTTPException } from "hono/http-exception";

export const registerUser = async (c: Context) => {
  const data = c.req.valid("json");
  // console.log(data);
  const {
    id,
    name,
    email,
    gender,
    phone,
    dateOfBirth,
    addressDetails,
    aadhaarDetails,
    medicalInformation,
  } = data;

  //hashing aadhaar number
  const aadhaarHash = await hashAadhaar(aadhaarDetails.aadhaarNumber);

  const user = await prisma.user.create({
    data: {
      id,
      name,
      email,
      gender,
      phone,
      dateOfBirth: dateOfBirth,
      AddressDetails: {
        create: {
          address: addressDetails.address,
          city: addressDetails.city,
          state: addressDetails.state,
          pinCode: addressDetails.pinCode,
        },
      },
      AadhaarDetails: {
        create: {
          aadhaarHash: aadhaarHash,
        },
      },
      MedicalInformation: {
        create: {
          bloodGroup: medicalInformation.bloodGroup,
          allergies: medicalInformation.allergies,
          chronicConditions: medicalInformation.chronicConditions,
          currentMedications: medicalInformation.currentMedications,
        },
      },
    },
  });
  return c.json({
    success: true,
    message: "User registered successfully!",
    data: user,
  });
};

export const getUser = async (c: Context) => {
  const userId = c.req.param("userId");
  if (!userId) {
    throw new HTTPException(400, { message: "User Id is required!" });
  }

  //finding user by id
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      AddressDetails: true,
      AadhaarDetails: true,
      MedicalInformation: true,
      medicalRecords: true,
    },
  });
  if (!user) {
    throw new HTTPException(404, { message: "User not found!" });
  }
  return c.json({
    success: true,
    message: "User fetched successfully!",
    data: user,
  });
};
