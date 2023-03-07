import { Request, Response } from "express";
import { Category } from "../entities";
import { allCategorieService, categorie_RealEstateService, createCategorieService } from "../services/categorie.service";


export const createCategorieController = async (req: Request, res: Response) => {

    const categorieData: Category = req.body

    const newCategorie = await createCategorieService(categorieData)

    return res.status(201).json(newCategorie) 
}

export const allCategorieController = async (req: Request, res: Response) => {

    const allCategorie = await allCategorieService()

    return res.status(200).json(allCategorie)
} 
 
export const categorieAllRealEstateController = async (req: Request, res: Response) => { 

    const getId = Number(req.params.id)

    const categorieRealEstate = await categorie_RealEstateService(getId)

    return res.status(200).json(categorieRealEstate)
} 