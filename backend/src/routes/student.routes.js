import { Router } from 'express';
import { getStudents, getStudentById, createStudent, updateStudent, deleteStudent, getStudentStats } from '../controllers/student.controller.js';

const router = Router();
router.get('/stats', getStudentStats);
router.get('/',      getStudents);
router.get('/:id',   getStudentById);
router.post('/',     createStudent);
router.put('/:id',   updateStudent);
router.delete('/:id',deleteStudent);
export default router;
