module.exports = {
    env  : process.argv[2] || process.env.NODE_ENV || 'development',
    port : process.env.PORT || 3000,
    sessionSecret: 'temp'
};