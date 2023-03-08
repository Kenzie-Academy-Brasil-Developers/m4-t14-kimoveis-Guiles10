import { union, z } from 'zod'

export const createAddressSchema = z.object({
    street: z.string(),
    zipCode: z.string().max(8),
    number: z.string().nullish(),
    city: z.string(),
    state: z.string().max(2)
})
export const returnAdressSchema = createAddressSchema.extend({
    id: z.number()
})

export const createRealEstateSchema = z.object({
    value: union([z.string(), z.number()]),
    size: z.number().positive(),
    address: createAddressSchema,
    categoryId: z.number()
})

export const returnRealEstateSchema = createRealEstateSchema.extend({
    id: z.number(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    category: z.object({
        id: z.number(),
        name: z.string()
    })
 }).omit({categoryId: true})

 export const returnAllRealEstateSchema = z.array(returnRealEstateSchema)

