require('dotenv').config();
const env = process.env;
const redis = require('redis');
const redisClient = redis.createClient(env.REDIS_PORT);

//// redis v4
// (async () => {
//     await redisClient.connect();
// })();

module.exports = redisClient