'use strict'
const amqp = require('amqplib')

async function consumerOrderedProducer(params) {
    const connection = await amqp.connect('amqp://guest:12345@localhost')
    const channel = await connection.createChannel();
    const queueName = 'ordered-queued-message'
    await channel.assertQueue(queueName, {
        durable: true
    })
    // sắp xếp cac message đúng thứ tự
    channel.prefetch(1)

    channel.consume(queueName, msg => {
        const message = msg.content.toString();
        setTimeout(() => {
            console.log('proccess:', message)
            channel.ack(msg)
        }, Math.random() * 1000);
    })
    setTimeout(() => {
        connection.close();
    }, 10000);
}

consumerOrderedProducer().catch(err => {console.error(err)})