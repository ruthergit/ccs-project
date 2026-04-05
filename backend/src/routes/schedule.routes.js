import { Router } from 'express';
import { getSchedules, createSchedule, deleteSchedule } from '../controllers/schedule.controller.js';

const router = Router();
router.get('/',      getSchedules);
router.post('/',     createSchedule);
router.delete('/:id',deleteSchedule);
export default router;
