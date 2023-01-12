import apiRoutes from './routes.js';
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import data from './db.js'
import dayjs from "dayjs"

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

        const removeParticipants = async () => {
            let participants = await db.collection('participants').find().toArray()
            let dateNow = Date.now()

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
        removeParticipants();
        setInterval(removeParticipants, 15000);
    }
})

app.use("/", apiRoutes)

