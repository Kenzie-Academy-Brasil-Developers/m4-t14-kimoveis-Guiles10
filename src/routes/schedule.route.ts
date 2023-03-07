import { Router } from "express";
import { allScheduleController, createScheduleController } from "../controllers/schedule.controller";
import { realEstateExistMidd } from "../middlewares/realEstateExistMidd";
import { scheduleIsExistMidd } from "../middlewares/scheduleIsExistMidd";
import { isAdminMidd } from "../middlewares/userIsAdminMidd";
import { validadeDataMidd } from "../middlewares/validateDataMidd";
import { validateTokenMidd } from "../middlewares/validateTokenMidd";
import { createScheduleSchema } from "../schemas/schedule.schema";

export const scheduleRoutes: Router = Router()

scheduleRoutes.post('', validateTokenMidd, validadeDataMidd(createScheduleSchema), createScheduleController)

scheduleRoutes.get('/realEstate/:id', validateTokenMidd, isAdminMidd, scheduleIsExistMidd, allScheduleController)