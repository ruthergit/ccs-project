import { Request, Response } from "express";
import { prisma } from "../config/db";

export const enrollStudent = async (req: Request, res: Response) => {
  const enrollment = await prisma.enrollment.create({
    data: req.body,
  });

  res.json(enrollment);
};