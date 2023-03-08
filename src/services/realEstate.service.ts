import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Address } from "../entities/address.entity";
import { Category } from "../entities/category.entity";
import { RealEstate } from "../entities/realEstate.entity";
import { AppError } from "../errors";
import { ICreateRealEstate, } from "../interfaces/realEstate.interface";


export const createRealEstateService = async (playlod: ICreateRealEstate): Promise<RealEstate> => {

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const categorieRepository: Repository<Category> = AppDataSource.getRepository(Category)
    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)

    const findCategory = await categorieRepository.findOneBy({ 
        id: playlod.categoryId
    })

    if(findCategory == undefined){ 
        throw new AppError('não existe esta categoria', 404) 
    }

    const findAddress = await addressRepository.findOneBy({ 
        street: playlod.address.street,
        zipCode: playlod.address.zipCode,
        number: playlod.address.number ? playlod.address.number : null!,
        city: playlod.address.city,
        state: playlod.address.state
    })
    if(findAddress){
        throw new AppError('Address already exists', 409) 
    }

    const address = addressRepository.create(playlod.address)
    const saveAddress = await addressRepository.save(address)

   
    const newRealEstate = realEstateRepository.create({
        ...playlod,
        address: saveAddress,
        category: findCategory,
    });

    const createdRealEstate = await realEstateRepository.save(newRealEstate);

    return createdRealEstate;

}  

export const allRealEstateService = async (): Promise<RealEstate[]> => {
    
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
        
    const findRealEstate: Array<RealEstate> = await realEstateRepository.find({
        relations: {
            address: true
        }
    })

    return findRealEstate
} 
