
import { postMessageSchema, putMessageSchema } from '../schemas/messages.schema.js'

export const postMessageValidation = (req, res, next) => {
    const { error } = postMessageSchema.validate(req.body)

    if(error == null) {
        next();
    } else {
        res.status(422).json({ error: "Dados inválidos" });
    }
}

export const putMessageValidation = (req, res, next) => {
    const { error } = putMessageSchema.validate(req.body)

    if(error == null) {
        next();
    } else {
        res.status(422).json({ error: "Dados inválidos" });
    }
}