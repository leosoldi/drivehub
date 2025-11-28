import { Router } from "express";
import { ensureAuth } from "../middlewares/ensureAuth";
import { ensureRole } from "../middlewares/ensureRole";
import { DriverController } from "../controllers/driver/driver.controller";

const driverRouter = Router();

driverRouter.use(ensureAuth, ensureRole("MOTORISTA"));

driverRouter.get("/me", DriverController.me);

export { driverRouter };
