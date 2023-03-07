import { Router } from "express";
import { allCategorieController, categorieAllRealEstateController, createCategorieController } from "../controllers/categorie.controller";
import { categorieExistMidd } from "../middlewares/categoryExistMidd";
import { nameCategorieExistMidd } from "../middlewares/nameCategorieExistMidd";
import { isAdminMidd } from "../middlewares/userIsAdminMidd";
import { validadeDataMidd } from "../middlewares/validateDataMidd";
import { validateTokenMidd } from "../middlewares/validateTokenMidd";
import { createCategorieSchema } from "../schemas/categorie.schema";

export const categoriesRoutes: Router = Router()

categoriesRoutes.post('', validadeDataMidd(createCategorieSchema), validateTokenMidd, isAdminMidd, nameCategorieExistMidd, createCategorieController)

categoriesRoutes.get('', allCategorieController)

categoriesRoutes.get('/:id/realEstate', categorieExistMidd, categorieAllRealEstateController)