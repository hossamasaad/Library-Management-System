import dotenv from 'dotenv'

dotenv.config();

const appConfig = {
    port: process.env.APP_PORT || 3000,
    jwt_secret: process.env.JWT_SECRET
}

export default appConfig