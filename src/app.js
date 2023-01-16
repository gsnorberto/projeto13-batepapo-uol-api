import apiRoutes from './routes.js';
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dayjs from "dayjs"
import { MongoClient } from 'mongodb'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection
const mongoClient = new MongoClient(process.env.DATABASE_URL)
export let db;

try {
    await mongoClient.connect();
    
} catch (error) {
    console.log(error.message);
}

db = mongoClient.db();

app.use("/", apiRoutes)


let PORT = 5000
app.listen(PORT, () => {
    console.log(`Servidor executando na porta ${PORT}`)
    setInterval(removeParticipants, 15000);
})


// Remove offline participants
const removeParticipants = async () => {
    let participants = await db.collection('participants').find().toArray()
    let dateNow = Date.now()

    //console.log("executando...");

    for (let participant of participants) {

        // not allowed - Remove participant
        if (participant.lastStatus + 10000 < dateNow) {
            try {
                // Remove participant
                await db.collection('participants').deleteOne({ name: participant.name })

                // send status message
                let message = { from: participant.name, to: 'Todos', text: 'sai da sala...', type: 'status', time: dayjs().format('HH:mm:ss') }
                await db.collection('messages').insertOne(message)

            } catch (err) {
                console.log("Ocorreu um erro");
            }

        }
    }
}