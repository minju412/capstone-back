const amqp = require("amqplib");

class TaskManager {
    constructor(url) {
        this.url = url;
    }

    async setup() {
        this.conn = await amqp.connect(this.url);
        this.channel = await this.conn.createChannel()

        this.channel.assertQueue("request", {durable: true})
        this.channel.assertQueue("response", {durable: true})
    }

    async processResponse(func) {
        if (!func) {
            throw Error('callback function is not assigned to response event')
        }
        const ch = this.channel;
        await ch.consume("response", async function (msg) {
            const correlationId = msg.properties.correlationId;
            const result = JSON.parse(msg.content.toString())
            await func(correlationId, result)

            await ch.ack(msg)
        })
    }

    async requestTask(correlationId, data) {
        if (!data || !correlationId) {
            throw new Error('no data or no taskId')
        }
        await this.channel.sendToQueue("request", Buffer.from(JSON.stringify(data)), {correlationId})
    }

    async checkTaskStatus(id) {
    }

    async getTaskResult(id) {
    }

}

module.exports = new TaskManager(`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}//`)