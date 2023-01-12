import { db } from "../app.js";

export default {
    addParticipant: async (req, res) => {
        let { name } = req.body;

        try{
            // search for participants with the same name
            let participant = await db.collection('participants').findOne({ name })
            if(participant) return res.status(409).send("Nome já cadastrado")

            // Register participant
            const data = { name, lastStatus: Date.now() }
            await db.collection('participants').insertOne(data)
            res.sendStatus(201)
        } catch(err){
            return res.status(500).send("Erro interno do servidor")
        }
    },

    getParticipants: (req, res) => {
        
    }
}