import { db } from "../app.js";
import dayjs from "dayjs"

export default {
    addMessage: async (req, res) => {
        let { to, text, type } = req.body
        let { from } = req.headers
        try {
            // search the participant in the database
            let participant = await db.collection('participants').findOne({ name: from })
            if (!participant) return res.sendStatus(401) // not found

            // Register message
            let message = {from, to, text, type, time: dayjs().format('HH:mm:ss')}
            await db.collection('messages').insertOne(message)
            res.sendStatus(201)
        } catch (err) {
            return res.sendStatus(500)
        }
    },

    getMessages: (req, res) => {

    },

    addStatus: (req, res) => {

    },
}