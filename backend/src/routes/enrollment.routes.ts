import { Router } from "express";
import { enrollStudent } from "../controllers/enrollment.controller";

const router = Router();

router.post("/", enrollStudent);

export default router;