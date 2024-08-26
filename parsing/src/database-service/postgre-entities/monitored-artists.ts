import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'MonitoredArtists' })
export class MonitoredArtists {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
        nullable: false
    })
    artistId: string
}