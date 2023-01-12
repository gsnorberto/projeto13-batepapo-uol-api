import apiRoutes from './routes.js';
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import data from './db.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection
export let db;
data.connectToDb((err) => {
    if (!err) {
        let PORT = process.env.PORT
        app.listen(PORT, () => {
            console.log(`Servidor executando na porta ${PORT}`)
        })
        db = data.getDb()
    }
})

app.use("/", apiRoutes)