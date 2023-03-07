import { z } from 'zod'

export const createScheduleSchema = z.object({
    date: z.string(),
    hour: z.string(),
    realEstateId: z.number(),
 })

 export const returnScheduleSchema = createScheduleSchema.extend({
    id: z.number(),
 })

 export const returnAllScheduleSchema = returnScheduleSchema.array()
