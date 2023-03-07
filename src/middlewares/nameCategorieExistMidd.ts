import { NextFunction, Request, Response } from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Category } from '../entities/category.entity'
import { User } from '../entities/user.entity'
import { AppError } from '../errors'
    
export const nameCategorieExistMidd = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const categorieRepository: Repository<Category> = AppDataSource.getRepository(Category)
      
    const nameCategorieExist = await categorieRepository.findOne({
        where: {
            name: req.body.name 
        }
    })

    if (nameCategorieExist) {
        throw new AppError ('Category already exists', 409)
    }
      
    next();
};