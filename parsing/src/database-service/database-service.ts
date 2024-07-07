import { PostgreSQL } from './postgre-database-service.js'
import { Redis } from './redis-database-service.js'
import { TrackData } from "./interfaces/track-data.js"

// await this.createTrack("Lorenzo von Matterhorn", "test1337");

export class DatabaseService {
    private static instance: DatabaseService
    private PostgreSQL: PostgreSQL
    private Redis: Redis

    public static getInstance(): DatabaseService {

        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService()
        }

        return DatabaseService.instance

    }

    private constructor() {
        this.PostgreSQL = new PostgreSQL
        this.Redis = new Redis
    }

    public async initialize() {
        // Innitialize DB Connections
        await this.PostgreSQL.init()
        await this.Redis.init()
    }

    public async addTrackIfNeeded(trackData: TrackData) {

        const trackAlreadyParsed = await this.Redis.isTrackAlreadyParsed(trackData)

        if (!(trackAlreadyParsed)) {

            // Track not parsed yet
            this.Redis.addTrack(trackData)
            this.PostgreSQL.addTrack(trackData)


        } else {
            console.log(`Track ${trackData.trackName} already parsed`)
        }
    }

}