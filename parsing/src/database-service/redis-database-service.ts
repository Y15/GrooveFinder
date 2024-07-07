import { EntityId, Schema, Repository } from 'redis-om';
import { createClient } from 'redis';
import { TrackData } from "./interfaces/track-data.js"

type RedisClientConnection = ReturnType<typeof createClient>

export class Redis {

    private RedisClient: RedisClientConnection
    private trackRepository: Repository

    private schema = new Schema("track", {
        title: { type: 'text' },
        artist: { type: 'text' },
    })

    public async init() {

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

        // Setup Repository For Track Buffer and build Index
        this.trackRepository = new Repository(this.schema, this.RedisClient)
        await this.trackRepository.createIndex();

        console.log("Connection to Redis established")
    }

    public async isTrackAlreadyParsed(trackData: TrackData): Promise<boolean> {

        //Use Redis as Write Throught Cache
        const trackCount = await this.trackRepository.search().where('title').match(trackData.trackName)
            .and('artist').match(trackData.artist).return.count()

        return trackCount <= 0 ? false : true

    }

    public async addTrack(trackData: TrackData) {

        await this.trackRepository.save({ artist: trackData.artist, title: trackData.trackName });

    }


}