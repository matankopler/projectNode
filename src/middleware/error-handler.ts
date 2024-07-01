import { ErrorRequestHandler } from "express";
import CardsError from "../errors/cardsErrors";
import { MongoServerError } from "mongodb";
import { ValidationError } from 'joi';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof CardsError) {
        return res.status(err.status).json(err);
    }
    if (err && err.name && err.name == "CastError" && err.path && err.value) {
        return res.status(400).json({ message: "Invalid object id", path: err.path, value: err.value });
    }
    if (err instanceof MongoServerError && err.code === 11000) {
        return res.status(400)
            .json({ message: "Duplicate key - Must be unique", value: err.keyValue });
    }
    if (err instanceof SyntaxError) {
        return res.status(400).json({ message: "Invalid JSON" });
    }
    if (err instanceof ValidationError) {
        return res.status(400).json({ message: err.message });
    }
    return res.status(500).json(err)
};

export default errorHandler;