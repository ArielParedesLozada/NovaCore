import 'dotenv/config'

export const env = {
    DATABASE_URL: process.env.DATABASE_URL,
    API_KEY: process.env.API_KEY,
    API_IMAGE_KEY: process.env.IMAGE_API_KEY,
    API_IMAGE_URL: process.env.IMAGE_API_URL,
    PORT: process.env.PORT
}