import { Request, Response } from "express";
import { prisma } from "../config/db";

export const createSubject = async (req: Request, res: Response) => {
  const subject = await prisma.subject.create({
    data: req.body,
  });

  res.json(subject);
};

export const getSubjects = async (_req: Request, res: Response) => {
  const subjects = await prisma.subject.findMany();
  res.json(subjects);
};