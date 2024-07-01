import { RequestHandler } from "express";
import { ObjectSchema } from "joi";

type ValidateSchema = (schema: ObjectSchema) => RequestHandler;

const validateSchema: ValidateSchema = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (e) {
        next(e);
    }
};

export default validateSchema;
