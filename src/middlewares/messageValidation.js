
import messagesSchema from '../schemas/messages.schema.js'

export const messageValidation = (req, res, next) => {
    const { error } = messagesSchema.validate(req.body)

    if(error == null) {
        next();
    } else {
        res.status(422).json({ error: "Dados inválidos" });
    }
}