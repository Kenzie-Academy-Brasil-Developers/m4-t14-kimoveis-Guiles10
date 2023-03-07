import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { allUserService, createUserService, deleteUserService, updateUserService } from "../services/user.service";


export const createUserController = async (req: Request, res: Response) => {

    const userData: User = req.body

    const NewUser = await createUserService(userData)

    return res.status(201).json(NewUser) 
}

export const allUserController = async (req: Request, res: Response) => {

    const allUser = await allUserService()

    return res.status(200).json(allUser)  
} 
 
export const updateUserController = async (req: Request, res: Response) => {

    const Data = req.body
    const Id = Number(req.params.id)

    const updateUser = await updateUserService(Data, Id)

    return res.status(200).json(updateUser)
}

export const deleteUserController = async (req: Request, res: Response) => {

    const dellUser = await deleteUserService(Number(req.params.id))

    return res.status(204).send() 
}
