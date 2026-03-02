// app.ts

import express from 'express';
import cors from 'cors';
import { prisma } from './config/db.js'; // Your existing db config

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/ping', async (req, res) => {
  try {
    // Quick DB test
    const userCount = await prisma.user.count();
    res.json({ message: 'pong', usersInDb: userCount });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Import and use your routes here later
// app.use('/api/users', userRouter);

export default app;