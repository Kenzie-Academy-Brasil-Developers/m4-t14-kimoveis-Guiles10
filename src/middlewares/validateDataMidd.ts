import { NextFunction, Request, Response } from "express"
import { ZodTypeAny } from "zod/lib"

export const validadeDataMidd = (schemas: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    
    const ValidateData = schemas.parse(req.body)
    
    req.body = ValidateData
 
    return next()
} 