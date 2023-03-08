import { Request, Response } from "express";
import { IScheduleUser } from "../interfaces/schedule.interface";
import { allScheduleRealEstateService, createScheduleService } from "../services/schedule.service";



export const createScheduleController = async (req: Request, res: Response) => {

    const scheduleData: IScheduleUser = req.body

    const getIdByToken = req.user.id

    const newScheduleData = await createScheduleService(scheduleData, getIdByToken)

    return res.status(201).json({"message": "Schedule created"}) 
}

export const allScheduleController = async (req: Request, res: Response) => {

    const getId = Number(req.params.id)

    const allSchedule = await allScheduleRealEstateService(getId)

    return res.status(200).json(allSchedule)
} 