import { RequestHandler, Request } from "express";
import { authService } from "../services/auth-service";
import CardsError from "../errors/cardsErrors";

const extractToken = (req: Request) => {
    const authHeader = req.header("x-auth-token");

    if (authHeader && authHeader.length > 0) {
        return authHeader;
    }

    throw new CardsError(400, "x-auth-token header is missing");
};

const validateToken: RequestHandler = (req, res, next) => {
    try {
        const token = extractToken(req);
        const payload = authService.validateJWT(token);
        req.payload = payload
        next();
    } catch (e) {
        next(e);
    }
};

export { extractToken, validateToken };