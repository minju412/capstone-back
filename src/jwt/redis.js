require('dotenv').config();
const env = process.env;
const redis = require('redis');
const redisClient = redis.createClient({url: env.REDIS_URL});

//// redis v4
// (async () => {
//     await redisClient.connect();
// })();

module.exports = redisClient