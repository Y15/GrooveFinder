import { AppDataSource } from './data-source.js'


export class Scheduler {

    constructor () {
        this.setUpConnectionToPostgressSQL()
    }

    async setUpConnectionToPostgressSQL() {
        await AppDataSource.initialize()
        console.log("success")
    }

}
