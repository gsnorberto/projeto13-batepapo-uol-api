import { db } from "../app.js"
import dayjs from "dayjs"

import { stripHtml } from "string-strip-html"

export default {
    addMessage: async (req, res) => {
        let to = stripHtml(req.body.to.trim()).result
        let text = stripHtml(req.body.text.trim()).result
        let type = stripHtml(req.body.type.trim()).result
        let user = stripHtml(req.headers.user.trim()).result

        try {
            // search the participant in the database
            let participant = await db.collection('participants').findOne({ name: user })
            if (!participant) return res.sendStatus(401) // not found

            // Register message
            let message = { from: user, to, text, type, time: dayjs().format('HH:mm:ss') }
            await db.collection('messages').insertOne(message)
            res.sendStatus(201)
        } catch (err) {
            return res.sendStatus(500)
        }
    },

    getMessages: async (req, res) => {
        let user = stripHtml(req.headers.user.trim()).result
        let limit = stripHtml(req.query.limit.trim()).result

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
        let user = req.headers.user.trim()
 
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