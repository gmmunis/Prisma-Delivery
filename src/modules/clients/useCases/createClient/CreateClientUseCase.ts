import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateClient {
    username: string;
    password: string;
}

export class CreateClientUseCase {
    async execute({ password, username }: ICreateClient) {
        if (!password) {
            throw new Error(`Missing password`);
        }

        if (!username) {
            throw new Error(`Missing username`);
        }

        const clientExists = await prisma.clients.findFirst({
            where: {
                username: {
                    mode: "insensitive",
                    equals: username,
                },
            },
        });

        if (clientExists) {
            throw new Error(`Client ${username} already exists`);
        }

        const hasPassword = await hash(password, 10);
        const client = await prisma.clients.create({
            data: {
                username,
                password: hasPassword,
            },
        });

        return client;
    }
}