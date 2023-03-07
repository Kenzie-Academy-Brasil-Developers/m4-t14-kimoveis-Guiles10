import { z } from 'zod'

export const createCategorieSchema = z.object({
    name: z.string().min(3).max(45),
 })

 export const returnCategorieSchema = createCategorieSchema.extend({
    id: z.number()
 }
 )
 export const returnAllCategorieSchema = returnCategorieSchema.array()


