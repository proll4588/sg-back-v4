import { prisma } from '../../controllers/prisma.controller.js';
import { USER_DEF } from './constants.js';
export class User {
    /* Статические методы */
    // Сделать фильтры
    static async getAllUsers() {
        return await prisma.user.findMany({
            select: USER_DEF,
        });
    }
    static async getUserById(userId) {
        return await prisma.user.findUnique({
            where: { id: userId },
            select: USER_DEF,
        });
    }
    // TODO: Можно использовать getAllUsers с фильтрами
    static async getUsersByRole(roleId) {
        return await prisma.user.findMany({
            where: { roleId: roleId },
            select: USER_DEF,
        });
    }
    static async createUser(login, password, roleId) {
        const data = await prisma.user.create({
            data: { login, password, roleId },
            select: { id: true },
        });
        return new User(data.id);
    }
    static async getUsersRoles() {
        return await prisma.role.findMany();
    }
    static async getUserByLogin(login) {
        const data = await prisma.user.findFirst({
            where: { login },
            select: { id: true },
        });
        if (data)
            return new User(data.id);
        else
            return null;
    }
    // TODO: Можно использовать getAllUsers с фильтрами
    static async getStudentUsers() {
        return await prisma.user.findMany({
            where: { Student: { isNot: null }, roleId: 2 },
            select: USER_DEF,
        });
    }
    constructor(userId) {
        this.userId = userId;
    }
    async getUserData() {
        return await User.getUserById(this.userId);
    }
    async deleteUser() {
        return await prisma.user.delete({
            where: { id: this.userId },
        });
    }
}
