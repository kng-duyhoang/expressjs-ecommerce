const ampqlib = require('amqplib');

const connectStr = `amqp://guest:12345@localhost`

const postVideo = async (msg) => {
    try {
        const connect = await ampqlib.connect(connectStr); //create connect
        const channel = await connect.createChannel(); // create channel
        const exchangeName = 'video' // create exchange
        await channel.assertExchange(exchangeName, 'fanout', {
            durable: false
        })
        // Publish video
        await channel.publish(exchangeName, '', Buffer.from(msg))
        console.log(`Send OK:::`, msg);

        setTimeout(() => {
            connect.close();
            process.exit();
        }, 5000);
        
    } catch (error) {
        console.log(error);
        throw error
    }
}

const msg = process.argv.slice(2).join(' ') || 'Hello';
postVideo(msg);
