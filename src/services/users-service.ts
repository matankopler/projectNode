
import { IJWTPayload, ILogin, IUser, IUserInput, IsBusiness } from "../@types/@types";
import User from "../db/models/user-model";
import CardsError from "../errors/cardsErrors";
import { authService } from "./auth-service";

export const usersService = {
    createUser: async (data: IUserInput) => {
        const user = new User(data);
        const hash = await authService.hashPassword(user.password);
        user.password = hash;
        return user.save();
    },

    loginUser: async ({ email, password }: ILogin) => {
        const user = await User.findOne({ email });
        if (!user) {
            throw new CardsError(401, "Invalid email or password");
        }
        const isValid = await authService.comparePassword(password, user.password);
        if (!isValid) {
            throw new CardsError(401, "Invalid email or password");
        }
        const payload: IJWTPayload = {
            _id: user._id.toString(),
            isAdmin: user.isAdmin,
            isBusiness: user.isBusiness,
        }
        return authService.generateJWT(payload);
    },

    getAllUsers: async () => User.find({}, { password: 0 }),

    getUserById: async (id: string) => User.findById(id, { password: 0 }),

    updateUser: async (data: IUserInput, id: string) => {
        data.password = await authService.hashPassword(data.password)
        return User.findOneAndUpdate({ _id: id }, data, { new: true });
    },

    updateIsBusiness: async (data: IsBusiness, id: string) => {
        return User.findOneAndUpdate({ _id: id }, data, { new: true })
    },

    deleteUser: async (data: IUser, id: string) => {
        data.password = await authService.hashPassword(data.password)
        return User.findOneAndDelete({ _id: id }, data)
    },
}