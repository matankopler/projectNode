import { Router } from "express";
import { cardService } from "../services/cards-service";
import { isSelf } from "../middleware/is-self";
import CardsError from "../errors/cardsErrors";
import { isBusiness } from "../middleware/is-business";
import validateSchema from "../middleware/joi/validate-schema";
import cardJoiSchema from "../validation/card-Joi-schema";
import { isAdminOrSelf } from "../middleware/is-admin-or-self";


const router = Router()


router.get("/", async (req, res, next) => {
    try {
        const cardss = await cardService.getCards();
        res.json(cardss);
    } catch (e) {
        next(e)
    }
});

router.get("/my-cards", ...isSelf, async (req, res, next) => {
    try {
        const mycards = await cardService.getCardByUserId(req.payload._id);
        res.json(mycards);
    } catch (e) {
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const cards = await cardService.getCardById(req.params.id);
        if (!cards) {
            throw new CardsError(400, "No such Card Id")
        }
        res.json(cards);
    } catch (e) {
        next(e)
    }
});

router.post("/", ...isBusiness, validateSchema(cardJoiSchema), async (req, res, next) => {
    try {
        const createCard = await cardService.createCard(req.body, req.payload._id);
        res.json(createCard);
    } catch (e) {
        next(e)
    }
});

router.put("/:id", ...isSelf, validateSchema(cardJoiSchema), async (req, res, next) => {
    try {
        const edit = await cardService.editCard(req.body, req.payload._id);
        res.json(edit);
    } catch (e) {
        next(e)
    }
});

router.patch("/:id", ...isSelf, validateSchema(cardJoiSchema), async (req, res, next) => {
    try {
        const like = await cardService.likeCard(req.params.id)
    } catch (e) {
        next(e)
    } 
});

router.delete("/:id", ...isAdminOrSelf, validateSchema(cardJoiSchema), async (req, res, next) => {
    try {
        const deleted = await cardService.deletCard(req.body, req.payload._id)
        res.json(deleted)
    } catch (e) {
        next(e)
    }   
});


export { router as cardRouter }