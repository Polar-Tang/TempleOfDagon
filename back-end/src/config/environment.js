import dotenv from 'dotenv'

// EXECUTE THIS SHIT
// node ./src/config/environment.js
dotenv.config()

const ENVIRONMENT = {
    URL_FRONT: process.env.URL_FRONT || '',
}

export default ENVIRONMENT