import { NextFunction, Request, Response } from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Category } from '../entities/category.entity'
import { AppError } from '../errors'
    
export const categorieExistMidd = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const categorieRepository: Repository<Category> = AppDataSource.getRepository(Category)
      
    const categorieExist = await categorieRepository.findOne({
        where: {
            id: Number(req.params.id) 
        }
    })

    if (!categorieExist) {
        throw new AppError ('Category not found', 404)
    }
      
    next();
};