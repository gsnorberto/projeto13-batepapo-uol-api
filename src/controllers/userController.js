import { db } from "../../server.js"

export default {
    addParticipant: (req, res) => {
        const data = {
            name: req.body.name,
            lastStatus: Date.now()
        }
        
        db.collection('participants')
            .insertOne(data)
            .then(() => {
                res.sendStatus(201)
            })
            .catch(() => {
                res.status(500).json({ error: 'Não pode cadastrar a cidade' })
            })
    },

    getParticipants: (req, res) => {

    }
}