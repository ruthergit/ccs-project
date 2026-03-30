import { Request, Response } from "express";
import { prisma } from "../config/db";

export const getUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      studentProfile: true,
      facultyProfile: true,
    },
  });

  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  const user = await prisma.user.create({
    data: { email, password, role },
  });

  res.json(user);
};