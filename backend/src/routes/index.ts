import { Router } from "express";
import { authRouter } from "./auth.routes";
import { workshopRouter } from "./workshop.routes";
import { driverRouter } from "./driver.routes";
import { vehicleRouter } from "./vehicle.routes"

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/workshops", workshopRouter);
routes.use("/drivers", driverRouter);
routes.use("/vehicle", vehicleRouter);

export { routes };
