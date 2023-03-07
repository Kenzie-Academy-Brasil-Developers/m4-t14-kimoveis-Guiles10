import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Address } from "./address.entity";
import { Category } from "./category.entity";
import { Schedule } from "./schedule.entiry";

@Entity('realEstate')
export class RealEstate {

    @PrimaryGeneratedColumn('increment')
    id: number 

    @Column({type: 'boolean', default: false})
    sold: boolean

    @Column({type: 'integer'})
    size: number

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    value: number | string;

    @CreateDateColumn({type: 'date'})
    createdAt: string

    @UpdateDateColumn({type: 'date'})
    updatedAt: string

    @OneToOne(() => Address, (address) => address.realEstate)
    @JoinColumn()
    address: Address

    @ManyToOne(() => Category, (category) => category.realEstate)
    category: Category

    @OneToMany(() => Schedule, (schedule) => schedule.realEstate)
    schedules: Schedule[];
}