import { AcademicSemester, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { AcademicSemesterSearchAbleFields } from "./academicSemester.constants";
import { IAcademicSemesterFilterRequest } from "./academicSemester.interface";



const insertIntoDB = async (academicSemesterData: AcademicSemester): Promise<AcademicSemester> => {
    const result = await prisma.academicSemester.create({
        data: academicSemesterData
    })

    return result;
}


const getAllFromDB = async (
    filters: IAcademicSemesterFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
    
    console.log(options);
    
    // console.log(filterData, filters);

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: AcademicSemesterSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    if(Object.keys(filterData).length > 0){
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key] : {
                    equals: (filterData as any )[key]
                }
            }))
        })
    }
    
    const whereConditions:Prisma.AcademicSemesterWhereInput = 
    andConditions.length > 0 ? {AND: andConditions} : {};

    // console.log(filters)

    const result = await prisma.academicSemester.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
        ? {
            [options.sortBy] : options.sortOrder
        }
        :{
            createdAt: 'desc'
        }
    });

    const total = await prisma.academicSemester.count();
    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    }
}

const getDataById = async(id: string): Promise<AcademicSemester | null> => {
    const result = await prisma.academicSemester.findUnique({
        where: {
            // id: id
            id
        }
    })
    
    return result;
}

const updateOneInDB = async (
    id: string,
    payload: Partial<AcademicSemester>
): Promise<AcademicSemester> => {
    const result = await prisma.academicSemester.update({
        where: {
            id
        },
        data: payload
    });
    return result;
};

const deleteByIdFromDB = async (id: string): Promise<AcademicSemester> => {
    const result = await prisma.academicSemester.delete({
        where: {
            id
        }
    });
    return result;
};


export const AcademicSemesterService = {
    insertIntoDB,
    getAllFromDB,
    getDataById,
    updateOneInDB,
    deleteByIdFromDB
}