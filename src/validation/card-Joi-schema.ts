import Joi from "joi";
import { ICardInput, Ilike } from "../@types/@types";
import { phoneRegex } from "./patterns";
import { addressJoiSchema, imageJoiSchema } from "./user-Joi-schema";




const cardJoiSchema = Joi.object<ICardInput>({
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    email: Joi.string().email().min(5).max(30).required(),
    phone: Joi.string().pattern(phoneRegex).min(9).max(11).required(),
    web: Joi.string().uri().min(14).max(100),
    address: addressJoiSchema,
    image: imageJoiSchema,
});

const cardJoiLikes = Joi.object<Ilike>({
    likes: Joi.string()
})

export default cardJoiSchema;

export { addressJoiSchema, imageJoiSchema, cardJoiLikes }