import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Track {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 200
    })
    name: string

    @Column({
        length: 200
    })
    artist: string
}