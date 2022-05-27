require('dotenv').config();
const env = process.env;
// const redis = require('redis');
// const redisClient = redis.createClient({url: env.REDIS_URL});

const Redis = require('ioredis');
const redisClient = new Redis({
    port: env.REDIS_PORT,
    host: env.REDIS_HOST,
    password: env.REDIS_PASSWORD,
    db: 0
})


//// redis v4
// (async () => {
//     await redisClient.connect();
// })();

module.exports = redisClient