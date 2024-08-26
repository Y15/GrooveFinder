// Agent to Parse Spotify
import { Agent } from './agent.js'
import axios from 'axios'
import { stringify } from 'qs'
import { MonitoredArtists } from "../database-service/postgre-entities/monitored-artists.js"

export class Spotify extends Agent {
    artists: MonitoredArtists[]
    albumIds: Number[] = []

    async checkNewReleases() {

        // Get last two albums from artists
        for (const artist of this.artists) {
            await this.getLast2AlbumsFromArtist(artist.artistId)
        }

        // Get all tracks from albums
        for (const albumId of this.albumIds) {

        }

    }

    async getTrackIds2Album(albumId: number) {
        const response = await fetch(``)
    }

    async getLast2AlbumsFromArtist(artist: string) {

        const response = await fetch(`https://api.spotify.com/v1/artists/${artist}/albums?market=DE&limit=2`, {
            headers: {
                'Authorization': `${this.Token}`
            }
        })

        const albums = await response.json()

        for (const v of albums.items) {
            this.albumIds.push(v.id)
        }

    }

    async setToken() {

        const data = stringify({
            grant_type: 'client_credentials'
        });

        const response = await axios.post(process.env.SPOTIFY_ACCESS_TOKEN_URL, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
            }
        });

        this.Token = `Bearer ${response.data.access_token}`
    }

    async getMonitoredArtists() {
        this.artists = await this.dbService.getMonitoredArtistIDs()
    }

}