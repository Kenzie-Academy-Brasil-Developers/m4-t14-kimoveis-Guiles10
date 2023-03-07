import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RealEstate, User } from "../entities";
import { Schedule }  from "../entities/schedule.entiry";
import { AppError } from "../errors";


export const createScheduleService = async (data: any, id: number): Promise<any> => {

    const scheduleRepo: Repository<Schedule> = AppDataSource.getRepository(Schedule)
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const user = await userRepo.findOneBy({id: id})

    const realEstate = await realEstateRepo.findOneBy({id: data.realEstateId})
    if(!realEstate){
        throw new AppError('RealEstate not found', 404) 
    }
 
    const hourParts = data.hour.split(':');
    const hourNumber = parseInt(hourParts[0], 10);
    if (hourNumber < 8 || hourNumber > 18) {
        throw new AppError('Invalid hour, available times are 8AM to 18PM', 400) 
    }

    const sameTimeSchedule = await scheduleRepo
    .createQueryBuilder('schedule')
    .where('schedule.date = :date', { date: data.date })
    .andWhere('schedule.hour = :hour', { hour: data.hour })
    .andWhere('schedule.realEstate = :realEstateId', { realEstateId: realEstate.id })
    .getOne();
    if (sameTimeSchedule) {
        throw new AppError('Schedule to this real estate at this date and time already exists', 409);
    }

    const userSchedules = await scheduleRepo
    .createQueryBuilder('schedule')
    .where('schedule.date = :date', { date: data.date })
    .andWhere('schedule.hour = :hour', { hour: data.hour })
    .andWhere('schedule.user = :userId', { userId: user!.id })
    .getMany();
    if (userSchedules.length > 0) {
        throw new AppError('User schedule to this real estate at this date and time already exists', 409);
    }

    const birthday = new Date(data.date);
    if (birthday.getDay() === 0 || birthday.getDay() === 6) {
      throw new AppError('Invalid date, work days are monday to friday', 400);
    }


    const newSchedule = scheduleRepo.create({
        ...data,
        realEstate: realEstate,
        user: user
    })

    await scheduleRepo.save(newSchedule);

    return newSchedule;

}  

export const allScheduleRealEstateService = async (id: number): Promise<any> => {
    
    const scheduleRepo: Repository<Schedule> = AppDataSource.getRepository(Schedule)
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const listSchedules = await realEstateRepo.findOne({
        relations: {
            category: true,
            address: true,
            schedules: {
                user: true,
            }
        },
        where: {
            id: id
        }
    })
    return listSchedules
}

