import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { RealEstate } from "./realEstate.entity";

@Entity('address')
export class Address {

    @PrimaryGeneratedColumn('increment')
    id: number 

    @Column({type: 'varchar', length: 45})
    street: string

    @Column({type: 'varchar', length: 8})
    zipCode: string

    @Column({type: 'varchar', length: 8, nullable: true}) 
    number?: string | undefined | null

    @Column({type: 'varchar', length: 20})
    city: string

    @Column({type: 'varchar', length: 2})
    state: string

    @OneToOne(() => RealEstate, (realEstate) => realEstate.address)
    realEstate: RealEstate
}
