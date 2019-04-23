import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { City } from "./City";
//Entidade resposavel pelo banco de dados da loja.
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

    @ManyToOne(type => City, cityId => cityId.id)
    @JoinColumn({name: "cityId"})
    city: City;  

}