import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import apiRoutes from './src/routes.js'

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", apiRoutes)

let PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor executando na porta ${PORT}`);
})