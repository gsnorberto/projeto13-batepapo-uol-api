import express from 'express'
let router = express.Router()
import UserController from './controllers/UserController.js'
import MessagesController from './controllers/MessagesController.js'
import { userValidation } from './middlewares/userValidation.js'
import { messageValidation } from './middlewares/messageValidation.js'

router.get('/', (req, res) => {
    res.send("Bate Papo Uol")
})

router.post('/participants', userValidation, UserController.addParticipant)
router.get('/participants', UserController.getParticipants)

router.post('/messages', messageValidation, MessagesController.addMessage)
router.get('/messages', MessagesController.getMessages)

router.post('/status', MessagesController.addStatus)

export default router