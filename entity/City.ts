import {Entity,Column,PrimaryGeneratedColumn,OneToOne,JoinColumn} from "typeorm"
import {State} from "./State";

@Entity()
export class City{

    @PrimaryGeneratedColumn()
    id:number

    @Column({length:100})
    nome:string;

    @Column({length:3})
    stateId:number


}