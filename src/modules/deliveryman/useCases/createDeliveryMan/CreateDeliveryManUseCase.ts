import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateDeliveryman {
    username: string,
    password: string,
}

export class CreateDeliveryManUseCase {
    async execute({ username, password }: ICreateDeliveryman) {
        const deliverymanExist = await prisma.deliveryman.findFirst({
            where: {
                username: {
                    mode: "insensitive",
                    equals: username,
                },
            },
        });

        if (deliverymanExist) {
            throw new Error("Deliveryman already exists");
        }

        const hashPassword = await hash(password, 10);
        const deliveryman = await prisma.deliveryman.create({
            data: {
                username,
                password: hashPassword
            },
        });

        return deliveryman;
    }
}