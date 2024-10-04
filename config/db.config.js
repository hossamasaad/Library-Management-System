import dotenv from 'dotenv'

dotenv.config();

const dbConfig = {
    host: process.env.MYSQL_DB_HOST,
    port: process.env.MYSQL_DB_PORT,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    dbName: process.env.MYSQL_DB_NAME,
}

export default dbConfig