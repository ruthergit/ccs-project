import { Router } from 'express';
import { getResearch, createResearch, deleteResearch } from '../controllers/research.controller.js';

const router = Router();
router.get('/',      getResearch);
router.post('/',     createResearch);
router.delete('/:id',deleteResearch);
export default router;
