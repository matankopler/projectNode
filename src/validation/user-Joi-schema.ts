import Joi from "joi";
import { passwordRegex, phoneRegex } from "./patterns";
import { IAddress, IImage, IName, IUser, IsBusiness } from "../@types/@types";

const addressJoiSchema = Joi.object<IAddress>({
    city: Joi.string().min(2).max(50).required(),
    country: Joi.string().min(2).max(50).required(),
    houseNumber: Joi.number(),
    street: Joi.string().min(2).max(50).required(),
    zip: Joi.string().min(2).max(10).required(),
    state: Joi.string().min(2).max(50),
});

const imageJoiSchema = Joi.object<IImage>({
    url: Joi.string().uri().required(),
    alt: Joi.string().min(2).max(50).required(),
});

const isBusinessJoiSchema = Joi.object<IsBusiness>({
    isBusiness: Joi.boolean().default(true).required()
})

const userJoiSchema = Joi.object<IUser>({
    isBusiness: Joi.boolean().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(phoneRegex).required(),
    password: Joi.string().pattern(passwordRegex).required(),
    address: addressJoiSchema.required(),
    name: Joi.object<IName>({
        first: Joi.string().min(2).max(50).required(),
        middle: Joi.string().min(0),
        last: Joi.string().min(2).max(50).required(),
    }).required(),
    image: imageJoiSchema,
});

export default userJoiSchema;

export { addressJoiSchema, imageJoiSchema, isBusinessJoiSchema }