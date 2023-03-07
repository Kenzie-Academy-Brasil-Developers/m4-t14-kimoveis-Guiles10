import { Router } from "express";
import { allRealEstateController, createRealEstateController } from "../controllers/realEstate.controller";
import { isAdminMidd } from "../middlewares/userIsAdminMidd";
import { validadeDataMidd } from "../middlewares/validateDataMidd";
import { validateTokenMidd } from "../middlewares/validateTokenMidd";
import { createRealEstateSchema } from "../schemas/realEstate.schema";

export const realEstateRoutes: Router = Router()

realEstateRoutes.post('', validadeDataMidd(createRealEstateSchema), validateTokenMidd, isAdminMidd, createRealEstateController)

realEstateRoutes.get('', allRealEstateController)