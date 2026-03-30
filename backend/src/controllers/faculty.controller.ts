import { Request, Response } from "express";
import { prisma } from "../config/db";

export const createFaculty = async (req: Request, res: Response) => {
  const faculty = await prisma.facultyProfile.create({
    data: req.body,
  });

  res.json(faculty);
};

export const getFaculty = async (_req: Request, res: Response) => {
  const faculty = await prisma.facultyProfile.findMany({
    include: {
      schedules: {
        include: { subject: true },
      },
    },
  });

  res.json(faculty);
};

// Load computation
export const getFacultyLoad = async (req: Request, res: Response) => {
  const { id } = req.params;

  const schedules = await prisma.schedule.findMany({
    where: { facultyId: Number(id) },
    include: { subject: true },
  });

  const totalUnits = schedules.reduce((sum, s) => sum + s.subject.units, 0);
  const totalHours = schedules.reduce((sum, s) => sum + s.subject.hours, 0);

  res.json({
    totalUnits,
    totalHours,
    totalSubjects: schedules.length,
  });
};