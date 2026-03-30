import express from 'express';
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import studentRoutes from "./routes/student.routes";
import facultyRoutes from "./routes/faculty.routes";
import subjectRoutes from "./routes/subject.routes";
import roomRoutes from "./routes/room.routes";
import scheduleRoutes from "./routes/schedule.routes";
import enrollmentRoutes from "./routes/enrollment.routes";
import researchRoutes from "./routes/research.routes";
import eventRoutes from "./routes/event.routes";
import materialRoutes from "./routes/material.routes";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/materials", materialRoutes);


export default app;