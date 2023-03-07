import { Router } from "express";
import { loginUserController } from "../controllers/login.controller";
import { userIsActiveMidd } from "../middlewares/userIsActiveMidd";
import { validadeDataMidd } from "../middlewares/validateDataMidd";
import { loguinUserSchema } from "../schemas/login.schema";

export const loginRoutes: Router = Router()

loginRoutes.post('', validadeDataMidd(loguinUserSchema), loginUserController)