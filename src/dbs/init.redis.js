'use strict'

const redis = require('redis');

let client = {}, statusConnectRedis = {
    CONNECT: 'connect',
    END: 'end',
    RECONECT: 'reconnect',
    ERROR: 'error'
};

const handleEventConnect = ({
    connectRedis
}) => {
    // check connect
    connectRedis.on(statusConnectRedis.CONNECT, () => {
        console.log(`Connected`)
    })

    connectRedis.on(statusConnectRedis.END, () => {
        console.log(`Disconnected`)
    })

    connectRedis.on(statusConnectRedis.RECONECT, () => {
        console.log(`Reconnect`)
    })

    connectRedis.on(statusConnectRedis.ERROR, (err) => {
        console.error(err)
    })
}
const initRedis = () => {
    const instanceRedis = redis.createClient();
    client.instanceRedis = instanceRedis;
    handleEventConnect({
        connectRedis: instanceRedis
    })
}

const getRedis = () => client

const closeRedis = () => {

}

module.exports = {
    initRedis,
    getRedis,
    closeRedis
}