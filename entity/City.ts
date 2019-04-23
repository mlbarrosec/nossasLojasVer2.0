import {Entity,Column,PrimaryGeneratedColumn,OneToOne,JoinColumn, ManyToOne} from "typeorm"
import {State} from "./State";

@Entity()
export class City{

    @PrimaryGeneratedColumn()
    id:number

    @Column({length:100})
    name:string;

    @ManyToOne(type => State, stateId => stateId.id)
    @JoinColumn({name: "stateId"})
    state: State;
}