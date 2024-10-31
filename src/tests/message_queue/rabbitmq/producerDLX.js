const amqp = require('amqplib');
const message = 'new a product';

const runProducer = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:12345@localhost')
        const channel = await connection.createChannel();
        const notificationeExchange = 'notificationEx'
        const notiQueue = 'notificationQueueProcess'
        const notificationExchangeDLX = 'notificationExDLX'
        const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX'

        // 1. Create Exchange
        await channel.assertExchange(notificationeExchange, 'direct', {
            durable: true
        })
        // 2. Create Queue
        const queueResult = await channel.assertQueue(notiQueue, {
            exclusive: false, // Cho phep các kết nối truy cập vào cùng lúc
            deadLetterExchange: notificationExchangeDLX,
            deadLetterRoutingKey: notificationRoutingKeyDLX
        })
        // 3. Bind queue
        await channel.bindQueue(queueResult.queue, notificationeExchange)
        // 4. Send Message
        const msg = 'a new product'
        console.log(`Product msg:`, msg);
        await channel.sendToQueue(queueResult.queue, Buffer.from(msg), {
             expiration: '10000'
        })
        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500);
    } catch (error) {
        console.error(error);
    }
}

runProducer().catch(console.error)