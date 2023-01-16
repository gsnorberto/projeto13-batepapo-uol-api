import apiRoutes from './routes.js';
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
//import data from './db.js'
import dayjs from "dayjs"
import { MongoClient } from 'mongodb'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection
export let db;

const mongoClient = new MongoClient(process.env.DATABASE_URL)
mongoClient.connect()
    .then((mongoClient) => {
        db = mongoClient.db()

        let PORT = 5000
        app.listen(PORT, () => {
            console.log(`Servidor executando na porta ${PORT}`)
        })

        //removeParticipants();
        setInterval(removeParticipants, 15000);
    })
    .catch(err => {
        console.log(err)
    })

// data.connectToDb((err) => {
//     if (!err) {
//         let PORT = 5000

//         app.listen(PORT, () => {
//             console.log(`Servidor executando na porta ${PORT}`)
//         })

//         db = data.getDb()

//         //removeParticipants();
//         setInterval(removeParticipants, 15000);
//     }
// })

app.use("/", apiRoutes)

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