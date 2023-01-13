import express from 'express'
let router = express.Router()
import UserController from './controllers/UserController.js'
import MessagesController from './controllers/MessagesController.js'
import { postUserValidation } from './middlewares/userValidation.js'
import { postMessageValidation, putMessageValidation } from './middlewares/messageValidation.js'

router.get('/', (req, res) => {
    res.send("Bate Papo Uol")
})

router.post('/participants', postUserValidation, UserController.addParticipant)
router.get('/participants', UserController.getParticipants)

router.post('/messages', postMessageValidation, MessagesController.addMessage)
router.get('/messages', MessagesController.getMessages)
router.delete('/messages/:ID_DA_MENSAGEM', MessagesController.deleteMessage)
router.put('/messages/:ID_DA_MENSAGEM', putMessageValidation, MessagesController.putMessage)

router.post('/status', MessagesController.addStatus)

export default router