module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/gametracker',
    JWT_SECRET: process.env.JWT_SECRET ,
    JWT_EXPIRY: process.env.JWT_EXPIRY || '20s'
}