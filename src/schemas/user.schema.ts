import { z } from 'zod'

export const createUserSchema = z.object({
    name: z.string().min(3).max(45),
    email: z.string().email().max(45),
    admin: z.boolean().optional().default(false),
    password: z.string(),
 }) 
 
 export const returnUserSchema = createUserSchema.extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(), 
    deletedAt: z.string().nullish(),
 }).omit({password: true})

 export const returnAllUserSchema = returnUserSchema.array()

 export const updateUserSchema = z.object({
   name: z.string().min(3).max(45).optional(),
   email: z.string().email().max(45).optional(),
   password: z.string().optional(),
}) 