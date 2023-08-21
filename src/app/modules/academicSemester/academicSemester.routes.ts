import express from 'express';
import { academicSemesterController } from './academicSemester.contoller';


const router = express.Router();

router.post('/', academicSemesterController.insertIntoDB)

export const AcademicSemesterRoutes = router;

