import { Router } from "express";
import {
  createFaculty,
  getFaculty,
  getFacultyLoad,
} from "../controllers/faculty.controller";

const router = Router();

router.get("/", getFaculty);
router.post("/", createFaculty);
router.get("/:id/load", getFacultyLoad);

export default router;