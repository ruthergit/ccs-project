import { Request, Response } from "express";
import { prisma } from "../config/db";

export const createMaterial = async (req: Request, res: Response) => {
  const material = await prisma.instructionalMaterial.create({
    data: req.body,
  });

  res.json(material);
};

export const getMaterials = async (_req: Request, res: Response) => {
  const materials = await prisma.instructionalMaterial.findMany({
    include: { subject: true },
  });

  res.json(materials);
};