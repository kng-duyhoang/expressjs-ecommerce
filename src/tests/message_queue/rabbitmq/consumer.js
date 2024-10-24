const ampq = require('amqplib');

const runProducer = async () => {
    try {
        const connection = await ampq.connect('amqp://guest:12345@localhost')
        const channel = await connection.createChannel();
        const queueName = 'test-topic'
        await channel.assertQueue(queueName, {
            durable: true
        })
        channel.consume( queueName, (messages) => {
            console.log(`received:`, messages.content.toString());
        }, {
            noAck: true
        })
    } catch (error) {
        console.error(error);
    }
}

runProducer().catch(console.error)  