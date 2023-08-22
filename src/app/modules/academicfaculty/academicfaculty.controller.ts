import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { AcademicFacultyService } from "./academicfaculty.service";
import { academicFacultyFilterableFields } from "./academicfaculty.constants";

const insertIntoDB = catchAsync(async(req:Request, res: Response) => {
    const result = await AcademicFacultyService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty created successfully',
        data: result
    });
});


const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, academicFacultyFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await AcademicFacultyService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'AcademicFaculties fetched successfully',
        meta: result.meta,
        data: result.data
    });
});


export const AcademicFacultyController = {
    insertIntoDB,
    getAllFromDB
};