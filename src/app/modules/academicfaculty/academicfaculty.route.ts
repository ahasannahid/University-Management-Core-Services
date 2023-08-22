import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicfaculty.controller';
import { AcademicFacultyValidation } from './academicfaculty.validation';


const router = express.Router();

router.get('/', AcademicFacultyController.getAllFromDB);
router.get('/:id', AcademicFacultyController.getByIdFromDB);

router.post('/',
validateRequest(AcademicFacultyValidation.create),
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
AcademicFacultyController.insertIntoDB)

export const academicFacultyRoutes = router;