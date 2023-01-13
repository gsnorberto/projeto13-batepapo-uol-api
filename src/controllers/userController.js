import { db } from "../app.js"
import dayjs from "dayjs"

import { stripHtml } from "string-strip-html";

export default {
    addParticipant: async (req, res) => {
        let name = stripHtml(req.body.name.trim()).result

        try{
            // search for participants with the same name
            let participant = await db.collection('participants').findOne({ name })
            if(participant) return res.status(409).send("Nome já cadastrado")

            // Register participant
            const data = { name, lastStatus: Date.now() }
            await db.collection('participants').insertOne(data)

            // Register status message
            let message = {from: name, to: 'Todos', text: 'entra na sala...', type: 'status', time: dayjs().format('HH:mm:ss')}
            await db.collection('messages').insertOne(message)

            res.sendStatus(201)
        } catch(err){
            return res.sendStatus(500)
        }
    },

    getParticipants: async (req, res) => {
        try{
            let data = await db.collection('participants').find().toArray()
            res.status(200).json(data)
        } catch(err){
            return res.sendStatus(500)
        }
    }
}