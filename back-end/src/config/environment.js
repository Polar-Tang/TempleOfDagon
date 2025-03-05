import dotenv from 'dotenv'

// EXECUTE THIS SHIT
// node ./src/config/environment.js
dotenv.config()

const ENVIRONMENT = {
    URL_FRONT: process.env.URL_FRONT,
    SUPABASE_project_URL: process.env.SUPABASE_project_URL,
    SUPABASE_apiKey: process.env.SUPABASE_apiKey
}

export default ENVIRONMENT