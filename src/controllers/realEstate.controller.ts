import { Request, Response } from "express";
import { RealEstate } from "../entities/realEstate.entity";
import { allRealEstateService, createRealEstateService } from "../services/realEstate.service";


export const createRealEstateController = async (req: Request, res: Response) => {

    const realEstateData: RealEstate = req.body

    const newRealEstateData = await createRealEstateService(realEstateData)

    return res.status(201).json(newRealEstateData)  
}

export const allRealEstateController = async (req: Request, res: Response) => {

    const allRealEstate = await allRealEstateService()

    return res.status(200).json(allRealEstate)
} 