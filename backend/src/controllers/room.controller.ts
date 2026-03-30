import { Request, Response } from "express";
import { prisma } from "../config/db";

export const createRoom = async (req: Request, res: Response) => {
  const room = await prisma.room.create({
    data: req.body,
  });

  res.json(room);
};

export const getRooms = async (_req: Request, res: Response) => {
  const rooms = await prisma.room.findMany({
    include: { schedules: true },
  });

  res.json(rooms);
};