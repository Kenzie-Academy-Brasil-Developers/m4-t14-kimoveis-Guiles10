import { NextFunction, Request, Response } from "express"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { RealEstate, Schedule } from "../entities"

import { AppError } from "../errors"


export const scheduleIsExistMidd = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const idExist = await realEstateRepo.findOne({
        where: { 
            id: Number(req.params.id) 
        }
    })
 
    if(!idExist){
        throw new AppError ('RealEstate not found', 404)
    }

    return next()
} 