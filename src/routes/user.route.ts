import { Router } from "express";
import { allUserController, createUserController, deleteUserController, updateUserController } from "../controllers/user.controller";
import { emailExistMidd } from "../middlewares/emailExistMidd";
import { userExistMidd } from "../middlewares/userExistMidd";
import { isAdminMidd } from "../middlewares/userIsAdminMidd";
import { userPermissionMidd } from "../middlewares/userPermissionMidd";
import { validadeDataMidd } from "../middlewares/validateDataMidd";
import { validateTokenMidd } from "../middlewares/validateTokenMidd";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";

export const userRoutes: Router = Router()

userRoutes.post('', validadeDataMidd(createUserSchema), emailExistMidd, createUserController)

userRoutes.get('', validateTokenMidd, isAdminMidd, allUserController)

userRoutes.patch('/:id', validadeDataMidd(updateUserSchema), validateTokenMidd, userExistMidd, userPermissionMidd, emailExistMidd, updateUserController)

userRoutes.delete('/:id', validateTokenMidd, userExistMidd, userPermissionMidd, deleteUserController)