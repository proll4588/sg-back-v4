import { prisma } from '../controllers/prisma.controller.js';
export class User {
    static async getAllUsers() {
        return await prisma.user.findMany({
            select: { id: true },
        });
    }
}
