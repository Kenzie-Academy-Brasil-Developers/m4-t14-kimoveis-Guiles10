import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Address } from "../entities";
import { Category } from "../entities/category.entity";
import { IAllCategorieReturn, ICategorieReturn, ICategorieUser } from "../interfaces/categorie.interface";
import { returnAllCategorieSchema, returnCategorieSchema } from "../schemas/categorie.schema";


export const createCategorieService = async (Data: ICategorieUser): Promise<ICategorieReturn> => {
    
    const categorieRepository: Repository<Category> = AppDataSource.getRepository(Category)
    
    const categorie: Category = categorieRepository.create(Data)

    await categorieRepository.save(categorie)

    const newCategorie = returnCategorieSchema.parse(categorie)

    return newCategorie
} 

export const allCategorieService = async (): Promise<IAllCategorieReturn> => {
    
    const categorieRepository: Repository<Category> = AppDataSource.getRepository(Category)
    
    const findCategorie: Array<Category> = await categorieRepository.find()

    const categories = returnAllCategorieSchema.parse(findCategorie)

    return categories
} 

export const categorie_RealEstateService = async (getId:number): Promise<any> => { 

    console.log(getId)

    const categoriesRepo: Repository<Category> = AppDataSource.getRepository(Category)

    const allRealStateCategory = await categoriesRepo.findOne({
        where:{
            id: getId
        },
        relations: ["realEstate"],
    })

    return allRealStateCategory
   
}
