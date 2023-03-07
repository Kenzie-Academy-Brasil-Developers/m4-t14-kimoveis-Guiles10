import { z } from "zod";


export const loguinUserSchema = z.object({
    email: z.string().email(),
    password: z.string()
})