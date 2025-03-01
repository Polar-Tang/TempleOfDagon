import express from 'express'
import corsOptions from './utils/corsOptions.js'
import cors from 'cors'
import ENVIRONMENT from './config/environment.js'
import authRouter from './routes/auth.route.js'

const port = 3000
const app = express()

app.use(cors(corsOptions))

app.use('/api/auth', authRouter)

app.listen(port, () => {
    console.log(`listen on http://localhost:${port}`)
})