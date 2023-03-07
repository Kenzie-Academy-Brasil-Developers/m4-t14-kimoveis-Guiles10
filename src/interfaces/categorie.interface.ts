import { z } from 'zod';
import { createCategorieSchema, returnAllCategorieSchema, returnCategorieSchema } from '../schemas/categorie.schema';


export type ICategorieUser = z.infer<typeof createCategorieSchema>;

export type ICategorieReturn = z.infer<typeof returnCategorieSchema>;

export type IAllCategorieReturn = z.infer<typeof returnAllCategorieSchema>;
