import { DatabaseService } from "../database-service/database-service.js"

export abstract class Agent {
    Token: String
    dbService: DatabaseService

    async start() {
        this.dbService = await DatabaseService.getInstance()
        await this.setToken()
        await this.getMonitoredArtists()
        await this.checkNewReleases()
    }

    async checkNewReleases() {
    }

    async setToken() {
    }

    async getMonitoredArtists() {
    }
}