import { Request, Response } from "express";
import { CreateDeliveryUseCase } from "./CreateDeliveryUseCase";

export class CreateDeliveryController {
    async handle(request: Request, response: Response) {
        const createDeliveryUseCase = new CreateDeliveryUseCase();

        const delivery = await createDeliveryUseCase.execute({
            id_client: request.id_client,
            item_name: request.body.item_name,
        });

        return response.json(delivery);
    }
}