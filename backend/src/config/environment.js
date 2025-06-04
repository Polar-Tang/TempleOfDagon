import dotenv from 'dotenv'

// EXECUTE THIS SHIT
// node ./src/config/environment.js
dotenv.config()

const ENVIRONMENT = {
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_USER: process.env.EMAIL_USER,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URI: process.env.MONGO_URI,
    isDocker: process.env.isDocker,
    DOMAIN: process.env.DOMAIN,
    MYSQL: {
        HOST: process.env.MYSQL_HOST,
        USER: process.env.MYSQL_USER,
        PASSWORD: process.env.MYSQL_PASSWORD,
        DATABASE: process.env.MYSQL_DATABASE,
        BACKENDURL: process.env.BACKENDURL,
        FRONTENDURL: process.env.FRONTENDURL,
    }

}

export default ENVIRONMENT

// npm install nodemailer
// npm install dotenv
// npm install jsonwebtoken