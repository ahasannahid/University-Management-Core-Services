import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
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
    const filters = pick(req.query, ['searchTerm', 'code', 'startMonth', 'endMonth']);
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

export const AcademicSemesterController = {
    insertIntoDB,
    getAllFromDB
}