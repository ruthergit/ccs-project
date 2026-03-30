import { Request, Response } from "express";
import { prisma } from "../config/db";

export const createResearch = async (req: Request, res: Response) => {
  const research = await prisma.research.create({
    data: req.body,
  });

  res.json(research);
};

export const getResearch = async (_req: Request, res: Response) => {
  const research = await prisma.research.findMany({
    include: { authors: true },
  });

  res.json(research);
};