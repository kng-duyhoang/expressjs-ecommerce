const ampqlib = require('amqplib');

const connectStr = `amqp://guest:12345@localhost`

const sendEmail = async () => {
    try {
        const connect = await ampqlib.connect(connectStr); //create connect
        const channel = await connect.createChannel(); // create channel
        const exchangeName = 'send_email' // create exchange
        await channel.assertExchange(exchangeName, 'topic', {
            durable: false
        })
        const argv = process.argv.slice(2)
        const msg = argv[1] || 'error'
        const topic = argv[0]
        // Publish video
        await channel.publish(exchangeName, topic, Buffer.from(msg))
        console.log(`Send OK:::`, msg);

        setTimeout(() => {
            connect.close();
            process.exit(0);
        }, 2000);
        
    } catch (error) {
        console.log(error);
        throw error
    }
}

sendEmail();
