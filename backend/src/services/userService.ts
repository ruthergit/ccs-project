import { prisma } from '../config/db.js';

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const createUserService = async (email: string, password: string, name?: string) => {
  return await prisma.user.create({
    data: { 
      email, 
      password,
      name 
    },
  });
};