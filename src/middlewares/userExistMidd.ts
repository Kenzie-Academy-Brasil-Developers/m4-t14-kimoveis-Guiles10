import { NextFunction, Request, Response } from "express"
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { User } from "../entities/user.entity"
import { AppError } from "../errors"


export const userExistMidd = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const idExist = await userRepository.findOne({
        where: { 
            id: Number(req.params.id) 
        }
    })
 
    if(!idExist){
        throw new AppError ('User not found', 404)
    }

    return next()
} 