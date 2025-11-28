import { Router } from "express";
import { ensureAuth } from "../middlewares/ensureAuth";
import { ensureRole } from "../middlewares/ensureRole";
import { VehicleController } from "../controllers/vehicle/vehicle.controller";

const vehicleRouter = Router();


vehicleRouter.use(ensureAuth, ensureRole("MOTORISTA"));

vehicleRouter.post("/", VehicleController.create);       // Cria
vehicleRouter.get("/", VehicleController.list);          // Lista todos
vehicleRouter.put("/:id", VehicleController.update);     // Edita
vehicleRouter.delete("/:id", VehicleController.delete);  // Deleta

export { vehicleRouter };
