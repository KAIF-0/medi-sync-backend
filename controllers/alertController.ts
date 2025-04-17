import type { Context } from "hono";
import { prisma } from "../configs/prisma";
import { HTTPException } from "hono/http-exception";

export const addAlert = async (c: Context) => {
  const { userId, latitude, longitude } = c.req.valid("json");
  console.log(userId, latitude, longitude);

  try {
    // const emergencyContacts = await prisma.emergencyContact.findMany({
    //   where: {
    //     userId,
    //   },
    // });
    // const emergencyContactArray = emergencyContacts.map((contact) => ;

    const alertMessage = await prisma.alert.create({
      data: {
        latitude,
        longitude,
        emergencyContacts: ["1234567890", "1234567890", "1234567890"],
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return c.json({
      succuss: true,
      message: "Alert added successfully!",
      data: alertMessage,
    });
  } catch (err) {
    throw new HTTPException(500, {
      message: err instanceof Error ? err.message : " Failed to add alert!",
    });
  }
};

export const getAlerts = async (c: Context) => {
  try {
    const alerts = await prisma.alert.findMany();

    return c.json({
      success: true,
      message: "All alerts fetched successfully!",
      data: alerts,
    });
  } catch (error) {
    throw new HTTPException(500, {
      message:
        error instanceof Error ? error.message : "Failed to fetch alerts!",
    });
  }
};

export const deleteAlert = async (c: Context) => {
  try {
    const { alertId } = c.req.param();

    const response = await prisma.alert.delete({
      where: {
        id: alertId,
      },
    });
    return c.json({
      success: true,
      message: "Alert deleted successfully!",
      data: response,
    });
  } catch (error) {
    throw new HTTPException(500, {
      message:
        error instanceof Error ? error.message : "Failed to delete alert!",
    });
  }
};
