import type { Context } from "hono";
import { prisma } from "../configs/prisma";

export const addContact = async (c: Context) => {
  const { userId, name, phone, email, relationship, isNotificationEnabled } =
    c.req.valid("json");

  const contact = await prisma.emergencyContact.create({
    data: {
      name,
      phone,
      email,
      relationship,
      isNotificationEnabled,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return c.json({
    success: true,
    message: "Emergency contact added successfully!",
    data: contact,
  });
};


export const getContacts = async (c: Context) => {
  const { userId } = c.req.valid("param");

  const contacts = await prisma.emergencyContact.findMany({
    where: {
      userId,
    },
  });

  return c.json({
    success: true,
    message: "All contacts fetched successfully!",
    data: contacts,
  });
};


export const updateContact = async (c: Context) => {
  const { contactId } = c.req.valid("param");
  const { updatedName, updatedphone, updatedemail } = c.req.valid("json");

  const contact = await prisma.emergencyContact.update({
    where: {
      id: contactId,
    },
    data: {
      name: updatedName,
      phone: updatedphone,
      email: updatedemail,
    },
  });
  return c.json({
    success: true,
    message: "Emergency contact updated successfully!",
    data: contact,
  });
};


export const deleteContact = async (c: Context) => {
  const { contactId } = c.req.valid("param");
  const contact = await prisma.emergencyContact.delete({
    where: {
      id: contactId,
    },
  });
  return c.json({
    success: true,
    message: "Emergency contact deleted successfully!",
    data: contact,
  });
};
