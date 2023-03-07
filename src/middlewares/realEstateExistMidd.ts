import { NextFunction, Request, Response } from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { RealEstate } from '../entities'
import { AppError } from '../errors'
    
export const realEstateExistMidd = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const realEstateExist = await realEstateRepo.findOne({
        where: {
            id: Number(req.body.realEstateId)
        }
    })

    if (!realEstateExist) {
        throw new AppError ('RealEstate not found', 404)
    }
    next();
};