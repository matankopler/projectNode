import _ from "underscore";
import { ICardInput } from "../@types/@types";
import Card from "../db/models/card-model";

const generateBizNumber = async () => {
    //generate random bizNumber:
    while (true) {
        const r = _.random(1_000_000, 9_999_999);
        const dbRes = await Card.findOne({ bizNumber: r });
        if (!dbRes) {
            return r;
        }
    }
};

export const cardService = {
    createCard: async (data: ICardInput, userId: string) => {
        const card = new Card(data);
        card.userId = userId;
        card.bizNumber = await generateBizNumber();

        console.log(card.bizNumber);

        return card.save();
    },

    getCards: async () => Card.find(),

    getCardById: async (id: string) => Card.findById(id),

    getCardByUserId: async (userId: string) => Card.find({ userId: userId }),

    editCard: async (data: ICardInput, userId: string) => {
        return Card.findOneAndUpdate({ userId: userId }, data, { new: true })
    },

    likeCard: async (id: string) => { return Card.findOneAndUpdate({ id }, { new: true }) },

    deletCard: async (data: ICardInput, userId: string) => {
        return Card.findOneAndDelete(data, { userId: userId })
    }
}