import { DataSource } from "typeorm"
import { Track } from "./postgres-entity/Track.js"

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