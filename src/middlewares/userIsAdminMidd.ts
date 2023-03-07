import { Request, Response, NextFunction} from 'express'
import { AppError } from '../errors'

export const isAdminMidd = async (req: Request, Res: Response, next: NextFunction) => {
    const isAdminUser = req.user

    if(!isAdminUser.admin){
        throw new AppError ('Insufficient permission', 403) 
    }
    return next()
}