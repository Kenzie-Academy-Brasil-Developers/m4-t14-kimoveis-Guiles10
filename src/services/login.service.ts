import { compare } from "bcryptjs";
import jwt from 'jsonwebtoken'
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors";
import { ILoginUser } from "../interfaces/login.interface";
import 'dotenv/config'
import { Repository } from "typeorm";

export const loginUser = async (loginData: ILoginUser): Promise<string> => {

    const userRepository: Repository<User>  = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOneBy({ 
        email: loginData.email
    })
    if(!user){
        throw new AppError('Invalid credentials', 401)
    }

    const passMatch = await compare(loginData.password, user.password)
    if(!passMatch){
        throw new AppError('Invalid credentials', 401)
    }

    const Token: string = jwt.sign(
        {
            admin: user.admin
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: '24h',
            subject: String(user.id),
        }
    )

        return Token

}