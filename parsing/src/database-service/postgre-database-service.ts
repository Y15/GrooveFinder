import { Track } from "./postgre-entities/Track.js"
import { DataSource } from "typeorm"
import { TrackData } from "./interfaces/track-data.js"



export class PostgreSQL {

    private AppDataSource = new DataSource({
        type: "postgres",
        host: "192.168.178.50",
        port: 5432,
        username: "example",
        password: "example",
        database: "example",
        synchronize: true,
        logging: true,
        entities: [Track],
        subscribers: [],
        migrations: [],
    })

    public async init() {
        // Setup PostgresSQL Connection
        await this.AppDataSource.initialize()
        console.log("Connection to PostgressSQL established")
    }

    public async addTrack(trackData: TrackData) {
        //Save Track to PostgresSQL
        const track = new Track()
        track.artist = trackData.artist
        track.name = trackData.trackName

        await this.AppDataSource.manager.save(track)

        console.log(`Track ${trackData.trackName} inserted`)
    }

}