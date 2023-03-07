import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { loginUser } from "../services/login.service";


export const loginUserController = async (req: Request, res: Response) => {

    const userData: User = req.body

    const userToken = await loginUser(userData)

    return res.status(200).json({
        token: userToken
    })
}