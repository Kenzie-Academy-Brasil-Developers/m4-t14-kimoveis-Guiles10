import { NextFunction, Request, Response } from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { User } from '../entities/user.entity'
import { AppError } from '../errors'
    
export const emailExistMidd = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    if(!req.body.email){
        return next();
    }

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const emailExist = await userRepository.findOne({
        where: {
            email: req.body.email
        },
        withDeleted: true
    })

    if (emailExist) {
        throw new AppError ('Email already exists', 409)
    }
      
    return next();
}; 