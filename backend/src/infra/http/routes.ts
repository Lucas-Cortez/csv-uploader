import { Router } from "express";
import { fileRoutes } from "../../app/routes/file.routes";
import { userRoutes } from "../../app/routes/user.routes";

const router = Router();

router.use("/files", fileRoutes);
router.use("/users", userRoutes);

export { router };
