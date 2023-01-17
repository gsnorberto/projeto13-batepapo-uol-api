import Joi from "joi";

export const postMessageSchema = Joi.object({
    to: Joi.string().required(),
    text: Joi.string().required(),
    type: Joi.string().required().valid("message", "private_message")
})

export const putMessageSchema = Joi.object({
    to: Joi.string().required(),
    text: Joi.string().required(),
    type: Joi.string().required().valid("message", "private_message")
})

export const getMessageSchema = Joi.object({
    User: Joi.string().required(),
})