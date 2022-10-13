import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateDeliveryMan {
    username: string;
    password: string;
}

export class CreateDeliveryManUseCase {
    async execute({ password, username }: ICreateDeliveryMan) {
        if (!password) {
            throw new Error(`Missing password`);
        }

        if (!username) {
            throw new Error(`Missing username`);
        }

        const deliveryManExists = await prisma.deliveryman.findFirst({
            where: {
                username: {
                    mode: "insensitive",
                    equals: username,
                },
            },
        });

        if (deliveryManExists) {
            throw new Error(`Deliveryman ${username} already exists`);
        }

        const hasPassword = await hash(password, 10);

        const deliveryman = await prisma.deliveryman.create({
            data: {
                username,
                password: hasPassword,
            },
        });

        return deliveryman;
    }
}