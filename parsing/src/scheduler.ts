import { DataSource } from "typeorm"
import { Agent } from './parsing-agents/agent.js'

export class Scheduler {

    queue: Array<Agent> = []

    public register(agent: Agent) {
        this.queue.push(agent)
    }

    public async start() {
        this.queue.forEach(async (agent) => {
            await agent.start()
        })
    }
}
