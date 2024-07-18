import { PostgreSQL } from './postgre-database-service.js'
import { Redis } from './redis-database-service.js'
import { TrackData } from "./interfaces/track-data.js"

export class DatabaseService {
    private static instance: DatabaseService
    private PostgreSQL: PostgreSQL
    private Redis: Redis

    public static async getInstance(): Promise<DatabaseService> {

        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService()
            await DatabaseService.instance.initialize()
        }

        return DatabaseService.instance

    }

    private constructor() {
        this.PostgreSQL = new PostgreSQL
        this.Redis = new Redis
    }

    public async initialize() {
        // Innitialize DB Connections
        await this.Redis.init()
        await this.PostgreSQL.init()
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

    public async getMonitoredArtistIDs() {
        return this.PostgreSQL.getMonitoredArtistIDs()
    }

}