import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validations';

const router = express.Router();

router.get('/', AcademicDepartmentController.getAllFromDB);
router.get('/:id', AcademicDepartmentController.getByIdFromDB);

router.post(
    '/',
    validateRequest(AcademicDepartmentValidation.create),
    // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    AcademicDepartmentController.insertIntoDB
);




export const academicDepartmentRoutes = router;