import { Request, Response } from "express";
import { prisma } from "../config/db";

export const createSchedule = async (req: Request, res: Response) => {
  const schedule = await prisma.schedule.create({
    data: req.body,
  });

  res.json(schedule);
};

export const getSchedules = async (_req: Request, res: Response) => {
  const schedules = await prisma.schedule.findMany({
    include: {
      subject: true,
      faculty: true,
      room: true,
    },
  });

  res.json(schedules);
};