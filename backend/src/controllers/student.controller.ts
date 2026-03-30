import { Request, Response } from "express";
import { prisma } from "../config/db";

export const createStudentProfile = async (req: Request, res: Response) => {
  const student = await prisma.studentProfile.create({
    data: req.body,
  });

  res.json(student);
};

export const getStudents = async (_req: Request, res: Response) => {
  const students = await prisma.studentProfile.findMany({
    include: {
      user: true,
      enrollments: {
        include: {
          schedule: {
            include: { subject: true },
          },
        },
      },
    },
  });

  res.json(students);
};

// Auto total units
export const getStudentLoad = async (req: Request, res: Response) => {
  const { id } = req.params;

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: Number(id) },
    include: {
      schedule: { include: { subject: true } },
    },
  });

  const totalUnits = enrollments.reduce(
    (sum, e) => sum + e.schedule.subject.units,
    0
  );

  res.json({ totalUnits, subjects: enrollments });
};