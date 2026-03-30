import { Router } from "express";
import {
  createSubject,
  getSubjects,
} from "../controllers/subject.controller";

const router = Router();

router.get("/", getSubjects);
router.post("/", createSubject);

export default router;