import express from 'express'
import corsOptions from './utils/corsOptions.js'
import cors from 'cors'
import ENVIRONMENT from './config/environment.js'
import authRouter from './routes/auth.route.js'

const port = 3000
const app = express()

app.use(cors(corsOptions))
app.use(express.json({limit: '3mb' }))


// const arrNUm = [ 1,23 ,3 ]
// let acc = 0

// arrNUm.forEach((num) => {

//     console.log("Numero actual ",num)
//     console.log("Acumulador: ",acc)
//     console.log("---------------------------------------------------------")
//     acc = acc + num  
// })
// console.log(acc)
// acc = 4
// console.log(acc)



app.use('/api/auth', authRouter)

app.listen(port, () => {
    console.log(`listen on http://localhost:${port}`)
})