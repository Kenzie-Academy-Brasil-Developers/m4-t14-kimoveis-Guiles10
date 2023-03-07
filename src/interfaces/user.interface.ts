import { DeepPartial, Repository } from 'typeorm';
import { z } from 'zod';
import { createUserSchema, returnAllUserSchema, returnUserSchema, updateUserSchema } from '../schemas/user.schema';


export type ICreateUser = z.infer<typeof createUserSchema>;

export type IUserReturn = z.infer<typeof returnUserSchema>;

export type IAllUserReturn = z.infer<typeof returnAllUserSchema>;

export type IUpdateUser =  DeepPartial<ICreateUser>;
