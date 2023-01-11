
import usersSchema from '../schemas/users.schema.js'

export const userValidation = (req, res, next) => {
    const { error } = usersSchema.validate(req.body)

    if(error == null) {
        next();
    } else {
        res.status(422).json({ error: "name deve ser string não vazio" });
    }
}