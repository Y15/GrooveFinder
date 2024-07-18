import { Scheduler } from "./scheduler.js"
import { DatabaseService } from "./database-service/database-service.js"
import { TrackData } from "./database-service/interfaces/track-data.js"
import { config } from 'dotenv'
import { Spotify } from './parsing-agents/spotify.js'

try {
    config();

    const scheduler = new Scheduler()
    scheduler.register(new Spotify)

    const dbService = await DatabaseService.getInstance()

    // const newTrack: TrackData = {
    //     artist: "fisch",
    //     trackName: "test"
    // }

    // await dbService.addTrackIfNeeded(newTrack)
    await scheduler.start()

} catch (error) {
    console.log("teeeeeeeeeeeeeeest")
    console.log(error)
}