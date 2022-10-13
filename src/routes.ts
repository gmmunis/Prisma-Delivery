import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientControllerUseCase";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { CreateDeliveryManController } from "./modules/deliveryman/useCases/createDeliveryMan/CreateDeliveryManController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliveryManController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const createDeliveryController = new CreateDeliveryManController();

routes.post("/client/", createClientController.handle);
routes.post("/client/authenticate", authenticateClientController.handle);
routes.post("/deliveryman", createDeliverymanController.handle);
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle);
routes.post("/delivery", ensureAuthenticateClient, createDeliveryController.handle);

export { routes };