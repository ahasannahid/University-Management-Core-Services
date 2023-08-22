import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validations';

const router = express.Router();

router.get('/',
    StudentController.getAllFromDB);

router.get('/:id', StudentController.getByIdFromDB);

router.post(
    '/',
    // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(StudentValidation.create),
    StudentController.insertIntoDB
);



export const studentRoutes = router;