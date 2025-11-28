import { Router } from "express";
import { ensureAuth } from "../middlewares/ensureAuth";
import { ensureRole } from "../middlewares/ensureRole";
import { WorkshopController } from "../controllers/workshop/workshop.controller";

const workshopRouter = Router();

workshopRouter.use(ensureAuth, ensureRole("OFICINA"));

workshopRouter.get("/me", WorkshopController.me);

export { workshopRouter };
