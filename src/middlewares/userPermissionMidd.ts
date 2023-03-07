import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors"
import 'dotenv/config'

export const userPermissionMidd = async (req: Request, res: Response, next: NextFunction): Promise< void> => {

    let getId = Number(req.params.id)

    if(getId === req.user.id){
        return next ()
    } 
    if(req.user.admin){ 
        return next ()
    }
   

    throw new AppError ('Insufficient permission', 403)
}