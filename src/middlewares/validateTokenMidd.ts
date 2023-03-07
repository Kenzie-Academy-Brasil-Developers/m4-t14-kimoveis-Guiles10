import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors"
import jwt  from "jsonwebtoken" 
import 'dotenv/config'

export const validateTokenMidd = async (req: Request, res: Response, next: NextFunction): Promise< void> => {
    
    let getToken = req.headers.authorization
 
    if(!getToken){  
        throw new AppError ('Missing bearer token', 401)
    }
  
    getToken = getToken.split(' ')[1] 
    
    return jwt.verify(getToken, process.env.SECRET_KEY!, (error, decoded: any) => {

        if(error){
            throw new AppError (error.message, 401)
        }
        
        req.user = {
            id: Number(decoded.sub),
            admin: decoded.admin
        }

        return next()
    })

}