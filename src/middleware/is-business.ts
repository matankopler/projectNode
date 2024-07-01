import { RequestHandler } from "express";
import CardsError from "../errors/cardsErrors";
import { validateToken } from "./validate-token";

const _isBusiness: RequestHandler = (req, res, next) => {
    const { isBusiness } = req.payload;
    if (isBusiness) {
        return next()
    }
    next(new CardsError(403, "Must be a Business"))
}

export const isBusiness = [validateToken, _isBusiness];