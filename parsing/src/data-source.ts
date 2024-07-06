import "reflect-metadata"
import { DataSource } from "typeorm"
import { Track } from "./entity/Track.js"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "192.168.178.50",
    port: 5432,
    username: "example",
    password: "example",
    database: "example",
    synchronize: true,
    logging: true,
    entities: [Track],
    subscribers: [],
    migrations: [],
})