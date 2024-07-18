import { DatabaseService } from "../database-service/database-service.js"

export abstract class Agent {
    Token: String
    dbService: DatabaseService

    async start() {
        this.dbService = await DatabaseService.getInstance()
        this.setToken()

        this.getMonitoredArtists()
    }

    async setToken() {

    }

    async getMonitoredArtists() {
        const artists = await this.dbService.getMonitoredArtistIDs()
        console.log(artists)
    }
}