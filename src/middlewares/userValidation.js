
import { postUserSchema } from '../schemas/users.schema.js'

export const postUserValidation = (req, res, next) => {
    const { error } = postUserSchema.validate(req.body)

    if(error == null) {
        next();
    } else {
        res.status(422).json({ error: "Dados inválidos" });
    }
}