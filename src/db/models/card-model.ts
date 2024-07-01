import mongoose from "mongoose";
import cardSchema from "../schemas/cards-schema";

const Card = mongoose.model("Card", cardSchema);

export default Card;