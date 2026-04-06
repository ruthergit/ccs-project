import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import authRoutes      from './routes/auth.routes.js';
import studentRoutes   from './routes/student.routes.js';
import facultyRoutes   from './routes/faculty.routes.js';
import eventRoutes     from './routes/event.routes.js';
import researchRoutes  from './routes/research.routes.js';
import roomRoutes      from './routes/room.routes.js';
import scheduleRoutes  from './routes/schedule.routes.js';
import materialRoutes  from './routes/material.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

const app = express();

// Allow any localhost port (Vite uses 5173-5176+)
app.use(cors());
app.use(express.json());

// Root
app.get('/', (_req, res) => res.json({ message: 'CCS API is running', version: '1.0.0' }));

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date() }));

// Routes
app.use('/api/auth',      authRoutes);
app.use('/api/students',  studentRoutes);
app.use('/api/faculty',   facultyRoutes);
app.use('/api/events',    eventRoutes);
app.use('/api/research',  researchRoutes);
app.use('/api/rooms',     roomRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/dashboard', dashboardRoutes);

// 404
app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

export default app;
