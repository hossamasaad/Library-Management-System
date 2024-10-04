import dotenv from 'dotenv'

dotenv.config();

const appConfig = {
    port: process.env.APP_PORT || 3000
}

export default appConfig