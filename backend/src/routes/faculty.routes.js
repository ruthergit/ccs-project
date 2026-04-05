import { Router } from 'express';
import { getFaculty, getFacultyById, createFaculty, updateFaculty, deleteFaculty } from '../controllers/faculty.controller.js';

const router = Router();
router.get('/',      getFaculty);
router.get('/:id',   getFacultyById);
router.post('/',     createFaculty);
router.put('/:id',   updateFaculty);
router.delete('/:id',deleteFaculty);
export default router;
