import express from 'express'
let router = express.Router()
import userController from './controllers/userController.js'
import messagesController from './controllers/messagesController.js'

router.get('/', (req, res) => {
    res.send("Bate Papo Uol")
})

router.post('/participants', userController.addParticipant)
router.get('/participants', userController.getParticipants)

router.post('/messages', messagesController.addMessage)
router.get('/messages', messagesController.getMessages)

router.post('/status', messagesController.addStatus)

export default router