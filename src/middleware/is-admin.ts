import { RequestHandler } from "express";
import CardsError from "../errors/cardsErrors";
import { validateToken } from "./validate-token";


const _isAdmin: RequestHandler = (req, _, next) => {
    if (req.payload?.isAdmin) {
        return next();
    }

    next(new CardsError(403, "Must be Admin"));
};

export const isAdmin = [validateToken, _isAdmin];