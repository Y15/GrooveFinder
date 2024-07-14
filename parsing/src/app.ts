import { Scheduler } from "./scheduler.js"
import { DatabaseService } from "./database-service/database-service.js"
import { TrackData } from "./database-service/interfaces/track-data.js"
import { config } from 'dotenv'
import { spotify } from './parsing-agents/spotify.js'

try {
    config();
    console.log(process.env);

    const scheduler = new Scheduler()
    scheduler.register(new spotify)
    
    const dbService = DatabaseService.getInstance()
    await dbService.initialize()

    // const newTrack: TrackData = {
    //     artist: "fisch",
    //     trackName: "test"
    // }

    // await dbService.addTrackIfNeeded(newTrack)
    console.log(await dbService.getMonitoredArtistIDs())

} catch (error) {
    console.log("error")
}