import express from 'express';
import { AcademicFacultyController } from './academicfaculty.controller';


const router = express.Router();

router.post('/', AcademicFacultyController.insertIntoDB)

export const academicFacultyRoutes = router;