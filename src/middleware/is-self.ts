import { RequestHandler } from "express";
import { validateToken } from "./validate-token";
import CardsError from "../errors/cardsErrors";

const _isSelf: RequestHandler = (req, res, next) => {
    if (req.params.id === req.payload?._id) {
        return next();
    }

    next(new CardsError(403, "Only the card owner is allowed"));
};

export const isSelf = [validateToken, _isSelf];