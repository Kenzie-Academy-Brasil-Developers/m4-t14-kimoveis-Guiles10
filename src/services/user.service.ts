import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors";
import { IAllUserReturn, ICreateUser, IUpdateUser, IUserReturn } from "../interfaces/user.interface";
import { returnAllUserSchema, returnUserSchema } from "../schemas/user.schema";

export const createUserService = async (data: ICreateUser): Promise<IUserReturn> => {
    
    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    
    const user: User = userRepository.create(data) 

    await userRepository.save(user)

    const newUser = returnUserSchema.parse(user) 

    return newUser
} 

export const allUserService = async (): Promise<IAllUserReturn> => {
    
    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    
    const findUsers: Array<User> = await userRepository.find()

    const users = returnAllUserSchema.parse(findUsers)

    return users
} 

export const updateUserService = async (data: IUpdateUser, id: number): Promise<IUserReturn> => {
    
    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    
    const oldUserData = await userRepository.findOneBy({ 
        id: id
    })

    if(data.admin !== undefined){
        throw new AppError ('Não pode editar chave admin', 404) 
    }

    const userEdited = userRepository.create({
        ...oldUserData,
        ...data
    })

    await userRepository.save(userEdited)

    const updatedeUser = returnUserSchema.parse(userEdited)

    return updatedeUser
}

export const deleteUserService = async (id: number): Promise<void> => { 
    
    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    
    const user = await userRepository.findOne({
        where: {
            id: Number(id)
        }
    })

    await userRepository.softRemove(user!)

}  