import express from 'express'
let router = express.Router()
import userController from './controllers/userController.js'
import messagesController from './controllers/messagesController.js'
import { postUserValidation } from './middlewares/userValidation.js'
import { postMessageValidation, putMessageValidation } from './middlewares/messageValidation.js'

router.get('/', (req, res) => {
    res.send("Bate Papo Uol")
})

router.post('/participants', postUserValidation, userController.addParticipant)
router.get('/participants', userController.getParticipants)

router.post('/messages', postMessageValidation, messagesController.addMessage)
router.get('/messages', messagesController.getMessages)
router.delete('/messages/:ID_DA_MENSAGEM', messagesController.deleteMessage)
router.put('/messages/:ID_DA_MENSAGEM', putMessageValidation, messagesController.putMessage)

router.post('/status', messagesController.addStatus) 

export default router