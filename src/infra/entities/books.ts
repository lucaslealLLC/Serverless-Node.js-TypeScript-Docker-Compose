import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm"

@Entity()
export class Books extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({type: "varchar", length: 255, nullable: false})
    author: string

    @Column({type: "varchar", length: 255, nullable: false, unique: true})
    title: string

    @CreateDateColumn({type: "timestamp", default: ()=>"CURRENT_TIMESTAMP(6)"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp", default: ()=> "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)", nullable: true})
    updatedAt: Date;
}