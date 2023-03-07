import { NextFunction, Request, Response } from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { User } from '../entities/user.entity'
import { AppError } from '../errors'
    
export const userIsActiveMidd = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const getDate = req.body.email

    const softDelete = await userRepository.findOne({
        where: {
            email: getDate,
            deletedAt: null!
        }
    });
  
    if (!softDelete) {
        throw new AppError ('usuario inativo', 404)
    }
      
    next();
};