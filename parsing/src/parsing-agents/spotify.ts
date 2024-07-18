// Agent to Parse Spotify
import { Agent } from './agent.js'
import axios from 'axios'
import { stringify } from 'qs'

export class Spotify extends Agent {

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

        console.log(response.data.access_token);
        // return response.data.access_token;
    }

}