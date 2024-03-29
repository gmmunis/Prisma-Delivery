import { Request, Response } from "express";
import { FindAllAvailableUseCase } from "./FindAllAvailableUseCase";

export class FindAllAvailableController {
    async handle(request: Request, response: Response) {
        const findAllAvailableController = new FindAllAvailableUseCase();
        const deliveries = await findAllAvailableController.execute();

        return response.json(deliveries);
    }
}