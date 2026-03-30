import { Request, Response } from "express";
import { prisma } from "../config/db";

export const createEvent = async (req: Request, res: Response) => {
  const event = await prisma.event.create({
    data: req.body,
  });

  res.json(event);
};

export const getEvents = async (_req: Request, res: Response) => {
  const events = await prisma.event.findMany({
    include: { organizer: true },
  });

  res.json(events);
};