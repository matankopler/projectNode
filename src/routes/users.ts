import { RequestHandler, Router } from "express";
import validateSchema from "../middleware/joi/validate-schema";
import userJoiSchema, { isBusinessJoiSchema } from "../validation/user-Joi-schema";
import { usersService } from "../services/users-service";
import loginJoiSchema from "../validation/login-Joi-schema";
import { isAdmin } from "../middleware/is-admin";
import { isAdminOrSelf } from "../middleware/is-admin-or-self";
import { isSelf } from "../middleware/is-self";



const router = Router();

router.post("/", validateSchema(userJoiSchema), async (req, res, next) => {
    try {
        const result = await usersService.createUser(req.body);
        const { password, ...saved } = result.toJSON();
        res.status(201).json(saved);
    } catch (e) {
        next(e)
    }
});

router.post("/login", validateSchema(loginJoiSchema), async (req, res, next) => {
    try {
        const jwt = await usersService.loginUser(req.body);
        res.send(jwt);
    } catch (e) {
        next(e)
    }
});

router.get("/",...isAdmin, async (req, res, next) => {
    try {
        const users = await usersService.getAllUsers()
        res.json(users)
    } catch (e) {
        next(e)
    }
});

router.get("/:id", ...isAdminOrSelf, async (req, res, next) => {
    try {
        const user = await usersService.getUserById(req.params.id)
        res.json(user);
    } catch (e) {
        next(e);
    }
});

router.put("/:id", ...isSelf, validateSchema(userJoiSchema), async (req, res, next) => {
    try {
        const saved = await usersService.updateUser(req.body, req.payload._id)
        res.json(saved);
    } catch (e) {
        next(e);
    }
});

router.patch("/:id", ...isSelf, validateSchema(isBusinessJoiSchema), async (req, res, next) => {
    try {
        const user = await usersService.updateIsBusiness(req.body, req.payload._id);
        res.json(user);
    } catch (e) {
        next(e)
    }
});

router.delete("/:id", ...isAdminOrSelf, validateSchema(userJoiSchema), async (req, res, next) => {
    try {
        const deleteUser = await usersService.deleteUser(req.body, req.params._id);
        res.json(deleteUser)
    } catch (e) {
        next(e)
    }
});

export default router;