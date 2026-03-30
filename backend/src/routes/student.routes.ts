import { Router } from "express";
import {
  createStudentProfile,
  getStudents,
  getStudentLoad,
} from "../controllers/student.controller";

const router = Router();

router.get("/", getStudents);
router.post("/", createStudentProfile);
router.get("/:id/load", getStudentLoad);

export default router;