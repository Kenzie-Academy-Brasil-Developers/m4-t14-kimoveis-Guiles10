
import { z } from 'zod';
import { createAddressSchema, createRealEstateSchema, returnRealEstateSchema } from '../schemas/realEstate.schema';


export type ICreateAddress = z.infer<typeof createAddressSchema>;

export type ICreateRealEstate = z.infer<typeof createRealEstateSchema>;

export type IReturnRealEstate = z.infer<typeof returnRealEstateSchema>;
