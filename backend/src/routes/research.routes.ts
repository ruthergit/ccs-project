import { Router } from "express";
import {
  createResearch,
  getResearch,
} from "../controllers/research.controller";

const router = Router();

router.get("/", getResearch);
router.post("/", createResearch);

export default router;