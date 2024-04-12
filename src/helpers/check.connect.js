'use strict'
const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const _SECOND = 5000

const countConnect = () => {
    const numConnect = mongoose.connections.length
    console.log(`Number of connection ${numConnect}`);
}

const checkOverloadConnect = () => {
    setInterval(() => {
        const numConnect = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUse = process.memoryUsage().rss
        //
        const maxConnection = numCores * 5
        console.log(`Active connection: ${numConnect}`);
        console.log(`memory use : ${memoryUse / 1024 / 1024} MB`);
        if (numConnect > maxConnection) {
            console.log('over load detect');
        }

    }, _SECOND); //Monitor every 5 seconds
}

module.exports = {
    countConnect,
    checkOverloadConnect
}
