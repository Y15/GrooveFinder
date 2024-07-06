import { DataSource } from "typeorm"
import { AppDataSource } from './postgres-data-source.js'
import { Track } from "./postgres-entity/Track.js"
import { EntityId, Schema, Repository } from 'redis-om';
import { createClient } from 'redis';

type RedisClientConnection = ReturnType<typeof createClient>



export class Scheduler {

    private AppDataSource: DataSource
    private RedisClient: RedisClientConnection

    private schema = new Schema("track", {
        title: { type: 'text' },
        artist: { type: 'text' },
    })

    private trackRepository: Repository

    constructor() {
        this.AppDataSource = AppDataSource
    }

    public async initialize() {
        // Innitialize DB Connections
        await this.initRedis()
        await this.initPostgressSQL()

        await this.createTrack("Lorenzo von Matterhorn", "testinger");
    }

    private async initRedis() {
        // Setup redis Connection
        this.RedisClient = createClient({
            username: '', // use your Redis user. More info https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/
            password: 'example', // use your password here
            socket: {
                host: '192.168.178.50',
                port: 6379,
                tls: false,
            }
        });

        this.RedisClient.on('error', err => console.error('Redis Initial Connection Error', err))

        await this.RedisClient.connect()

        // Setup Repository and build Index
        this.trackRepository = new Repository(this.schema, this.RedisClient)
        await this.trackRepository.createIndex();

        console.log("Connection to Redis established")
    }

    private async initPostgressSQL() {
        // Setup PostgresSQL Connection
        await this.AppDataSource.initialize()
        console.log("Connection to PostgressSQL established")
    }

    private async isTrackAlreadyParsed(artist: string, trackName: string): Promise<boolean> {

        // let trackCount = await this.trackRepository.search().return.count()

        const trackCount = await this.trackRepository.search().where('title').match(trackName, { fuzzyMatching: true, levenshteinDistance: 3 })
            .and('artist').match(artist).return.count()

        return trackCount <= 0 ? false : true

    }

    private async createTrack(artist: string, trackName: string) {

        const trackAlreadyParsed = await this.isTrackAlreadyParsed(artist, trackName)

        if (!(trackAlreadyParsed)) {
            // Track not parsed yet

            //Save Track to Redis
            await this.trackRepository.save({ artist: artist, title: trackName });

            //Save Track to PostgresSQL
            const track = new Track()
            track.artist = artist
            track.name = trackName

            await this.AppDataSource.manager.save(track)
            console.log(`Track ${trackName} inserted`)
        } else {
            console.log(`Track ${trackName} already parsed`)
        }
    }

}
