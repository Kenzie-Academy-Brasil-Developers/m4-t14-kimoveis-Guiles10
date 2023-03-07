import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { RealEstate } from "./realEstate.entity";
import { User } from "./user.entity";

@Entity('schedules')
export class Schedule {

    @PrimaryGeneratedColumn('increment')
    id: number 

    @Column({ type:"date" })
    date: string

    @Column() 
    hour: string

    @ManyToOne(() => User)
    user: User

    @ManyToOne(() => RealEstate)
    realEstate: RealEstate
}