const ampqlib = require('amqplib');

const connectStr = `amqp://guest:12345@localhost`

const receiveNoti = async () => {
    try {
        const connect = await ampqlib.connect(connectStr); //create connect
        const channel = await connect.createChannel(); // create channel
        const exchangeName = 'video' // create exchange
        await channel.assertExchange(exchangeName, 'fanout', {
            durable: false
        })
        // create queue
        const {
            queue
        } = await channel.assertQueue('')
        console.log(`Name Queue:::`, queue);
        await channel.bindQueue(queue, exchangeName, '')
        await channel.consume( queue, msg => {
            console.log(`msg received:::`, msg.content.toString());
            
        }, {
            noAck: true
        })
        
    } catch (error) {
        console.log(error);
        throw error
    }
}

receiveNoti();
