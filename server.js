import { MongoClient } from 'mongodb'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import apiRoutes from './src/routes.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dotenv.config()

// MongoDB - Connection
const mongoClient = new MongoClient(process.env.DATABASE_URL);

async function main() {
    await mongoClient.connect()
    console.log("Conectato ao servidor com sucesso!")
    const db = mongoClient.db("teste")
    const collection = db.collection('documents')

    // Insert data
    // const insertResult = await collection.insertOne({name: 'Gabriel s Nor', lastStatus: Date.now()});
    // console.log('Inserted documents =>', insertResult);

    return "OK!";
}
main()
    .then(console.log)
    .catch(console.error)
    .finally(() => mongoClient.close())



app.use("/", apiRoutes)

let PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servidor executando na porta ${PORT}`)
})