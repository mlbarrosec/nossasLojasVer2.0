import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class State {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:100})
    name:string;

    @Column({length:100})
    region:string;

    @Column({length:3})
    initials:string;
}