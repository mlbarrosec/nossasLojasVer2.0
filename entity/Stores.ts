import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity() 
export class Stores{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length: 255})
    name:string

    @Column({length: 255})
    address:string

    @Column({length: 255})
    phone:string

    @Column({length: 255})
    cnpj:string

    @Column({length: 255})
    workingHour:string

    @Column({length: 255})
    city:string

    @Column({length: 3})
    state:string

}