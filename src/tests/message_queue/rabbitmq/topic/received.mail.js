const ampqlib = require('amqplib');

const connectStr = `amqp://guest:12345@localhost`

const receivedMail = async () => {
    try {
        const connect = await ampqlib.connect(connectStr); //create connect
        const channel = await connect.createChannel(); // create channel
        const exchangeName = 'send_email' // create exchange
        await channel.assertExchange(exchangeName, 'topic', {
            durable: false
        })
        // create queue
        const {
            queue
        } = await channel.assertQueue('', {
            exclusive: true
        })
        // binding
        // * phù hợp với bất kì từ nào
        // # khớp với một hoạc nhiều từ bất kì
        const argv = process.argv.slice(2)
        if (!argv.length) {
            process.exit(0)
        }
        console.log(`waiting queue ${queue} :: topic: ${argv}`);
        
        argv.forEach(async key => {
            await channel.bindQueue( queue, exchangeName, key)
        });
        // Publish mail
        await channel.consume(queue, msg => {
            console.log(`Routing key: ${msg.fields.routingKey}::: msg:${msg.content.toString()}`);
        })
        
    } catch (error) {
        console.log(error);
        throw error
    }
}

receivedMail();
