import { Request, Response } from "express";
import { prisma } from "../lib/prismaClient";
import { createRoomSchema } from "../validations/roomValidation";

export const createRoom = async (req: Request, res: Response): Promise<any> => {
  try {
    // Validate the input
    const validation = createRoomSchema.safeParse({
      roomName: req.body.roomName, // Corrected to access roomName directly
      hostUserId: req.userId,
    });

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid Input",
        errors: validation.error.errors,
      });
    }

    const { roomName, hostUserId } = validation.data;

    // Check for required fields
    if (!roomName || !hostUserId) {
      return res.status(400).json({
        success: false,
        message: "Invalid Inputs",
      });
    }

    // Create the room in the database
    const room = await prisma.room.create({
      data: { roomName, hostUserId },
    });

    return res.status(201).json({
      success: true,
      message: "Room Created",
      room,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to create room",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
