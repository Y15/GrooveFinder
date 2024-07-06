import { Scheduler } from "./scheduler.js"

try {
    const scheduler = new Scheduler()
    await scheduler.initialize()

} catch (error) {
    console.log("error")
}