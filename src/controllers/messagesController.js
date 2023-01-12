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
            let message = { from, to, text, type, time: dayjs().format('HH:mm:ss') }
            await db.collection('messages').insertOne(message)
            res.sendStatus(201)
        } catch (err) {
            return res.sendStatus(500)
        }
    },

    getMessages: async (req, res) => {
        let { user } = req.headers
        let { limit } = req.query

        try {
            // Filter messages send by User, or "to Todos", or "to User"
            let messages = await db.collection('messages').find({ $or: [{ from: user }, { to: { $in: ["Todos",user] } }] }).toArray()

            // Return limit number of messages passed by user
            if (limit && limit < messages.length) {
                return res.status(200).json(messages.slice(messages.length - limit, messages.length))
            }

            return res.status(200).json(messages)
        } catch (err) {
            return res.sendStatus(500)
        }
    },

    addStatus: async (req, res) => {
        let { user } = req.headers

        try{
            let participant = await db.collection('participants').findOne({ name: user })

            // participant not found
            if(!participant) return res.sendStatus(404);

            // update last Status
            await db.collection('participants').updateOne({name: user}, {$set: {lastStatus: Date.now()}});

            res.sendStatus(200)
        } catch(err){
            return res.sendStatus(500)
        }
    },
}