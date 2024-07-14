import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class MonitoredArtists {

    @PrimaryGeneratedColumn()
    id: number;  // Primärschlüssel

    @Column({
        length: 50
    })
    artistId: string
}