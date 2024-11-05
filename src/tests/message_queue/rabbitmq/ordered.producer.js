'use strict'
const amqp = require('amqplib')

async function producerOrderedProducer() {
    const connection = await amqp.connect('amqp://guest:12345@localhost')
    const channel = await connection.createChannel();
    const queueName = 'ordered-queued-message'
    await channel.assertQueue(queueName, {
        durable: true
    })

    for (let index = 0; index < 10; index++) {
        const message = `ordered message::: ${index}`
        console.log(`message: ${message}`);
        channel.sendToQueue( queueName, Buffer.from(message), {
            persistent: true
        });
    }

    setTimeout(() => {
        connection.close();
    }, 10000);
}

producerOrderedProducer().catch(err => {console.error(err)})