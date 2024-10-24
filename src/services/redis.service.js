'use strict'
const redis = require('redis');
const redisClient = redis.createClient(6379,6379);
const waitClient = async () => {
    await redisClient.connect();
    redisClient.on('error', (err) => {
        throw err;
    });
    const value = await redisClient.get('k1');
}

waitClient();