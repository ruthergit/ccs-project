import { Request, Response } from 'express';
import * as userService from '../services/userService.js';

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};