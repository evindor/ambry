module.exports = {
    mongoUrl: process.env.MONGOHQ_URL || 'mongodb://localhost/ambry',
    redisConf: {
        host: process.env.REDIS_URL || 'localhost',
        port: 6379,
        db: 2,
        pass: ''
    }
}
