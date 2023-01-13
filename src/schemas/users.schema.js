import Joi from "joi";

export const postUserSchema = Joi.object({
    name: Joi.string().required()
})