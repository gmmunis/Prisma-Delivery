import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryMan } from "./middlewares/ensureAuthenticateDeliveryMan";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientControllerUseCase";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { UpdateDeliveryManController } from "./modules/deliveries/useCases/updateDeliveryMan/UpdateDeliveryManController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/FindAllAvailableController";
import { CreateDeliveryManController } from "./modules/deliveryman/useCases/createDeliveryMan/CreateDeliveryManController";
import { FindAllDeliveriesController } from "./modules/clients/useCases/deliveries/FindAllDeliveriesController";

const routes = Router();
const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliveryManController();
const createDeliveryController = new CreateDeliveryController();
const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliveryManController = new UpdateDeliveryManController();
const findAllDeliveriesController = new FindAllDeliveriesController();

routes.post("/client/", createClientController.handle);
routes.post("/deliveryman", createDeliverymanController.handle);

routes.post("/client/authenticate", authenticateClientController.handle);
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle);
routes.post("/delivery", ensureAuthenticateClient, createDeliveryController.handle);
routes.get("/delivery/available", ensureAuthenticateDeliveryMan, findAllAvailableController.handle);
routes.put("/delivery/updateDeliveryMan/:id", ensureAuthenticateDeliveryMan, updateDeliveryManController.handle);
routes.get("/client/deliveries", ensureAuthenticateClient, findAllDeliveriesController.handle);

export { routes };