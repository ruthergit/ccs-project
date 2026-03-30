import { Router } from "express";
import {
  createSchedule,
  getSchedules,
} from "../controllers/schedule.controller";

const router = Router();

router.get("/", getSchedules);
router.post("/", createSchedule);

export default router;