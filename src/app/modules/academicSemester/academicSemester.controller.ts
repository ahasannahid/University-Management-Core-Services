import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterFilterableFields } from './academicSemester.constants';
import { AcademicSemesterService } from './academicSemester.service';

// without calling catchAsync function
// const insertIntoDB = async(req: Request, res: Response, next: NextFunction) => {
//     try{
//         const result = await AcademicSemesterService.insertIntoDB(req.body);
//         sendResponse<AcademicSemester>(res,{
//             statusCode: httpStatus.OK,
//             success: true,
//             message: "Academic Semester created!!",
//             data: result

//         })
//     }
//     catch(error){
//         next(error)
//     }
// }

// calling with catchAsync function
const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicSemesterService.insertIntoDB(req.body);
    sendResponse<AcademicSemester>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Semester created!!",
        data: result
    })
})


const getAllFromDB = catchAsync(async(req: Request, res: Response) => {
    // console.log(req.query)
    const filters = pick(req.query, AcademicSemesterFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    
    // console.log("filters:", filters);
    // console.log("options:", options);
    
    const result = await AcademicSemesterService.getAllFromDB(filters,options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Semester Data fetched!!",
        meta: result.meta,
        data: result.data
    })
}) 


const getDataById = catchAsync(async(req: Request, res: Response) => {
    const result = await AcademicSemesterService.getDataById(req.params.id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Semester Data fetched by id!!",
        data: result
    })
})


const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicSemesterService.updateOneInDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semster updated successfully',
        data: result
    });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicSemesterService.deleteByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semster delete successfully',
        data: result
    });
});

export const AcademicSemesterController = {
    insertIntoDB,
    getAllFromDB,
    getDataById,
    updateOneInDB,
    deleteByIdFromDB
}