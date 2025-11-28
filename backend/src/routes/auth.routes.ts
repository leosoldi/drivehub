import { Router } from "express";
import { AuthController } from "../controllers/auth/auth.controller";
import { AuthManualController } from "../controllers/auth/AuthManualController";
import { AuthPasswordController } from "../controllers/auth/AuthPasswordController";
const authRouter = Router();

authRouter.post("/google", AuthController.googleLogin);

authRouter.post("/register/driver-manual", AuthManualController.registerDriver);
authRouter.post("/register/workshop-manual", AuthManualController.registerWorkshop);

authRouter.post("/login/password", AuthPasswordController.login);

export { authRouter };
