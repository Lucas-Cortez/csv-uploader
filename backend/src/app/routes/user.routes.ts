import { Router } from "express";
import { userController } from "../modules/user.module";

const userRoutes = Router();

userRoutes.get("/", (req, res) => userController.search(req, res));

export { userRoutes };
