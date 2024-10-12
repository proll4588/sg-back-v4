import { prisma } from '../controllers/prisma.controller.js';
export const getAllUsers = async () => {
    return await prisma.user.findMany({
        select: { id: true },
    });
};
