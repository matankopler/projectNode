import { RequestHandler } from "express";
import { validateToken } from "./validate-token";
import CardsError from "../errors/cardsErrors";

const _isAdminOrSelf: RequestHandler = (req, _, next) => {
    const requestedId = req.params.id;
    const userId = req.payload._id;

    if (requestedId === userId || req.payload.isAdmin) {
        return next();
    }

    next(new CardsError(403, "Must be the requested user or admin"));
};

export const isAdminOrSelf = [validateToken, _isAdminOrSelf];