import { Router } from "express";
import {
  createMaterial,
  getMaterials,
} from "../controllers/material.controller";

const router = Router();

router.get("/", getMaterials);
router.post("/", createMaterial);

export default router;