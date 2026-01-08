import { prisma } from '../lib/db.js';
export class SessionRepository {
    async create(data) {
        return prisma.session.create({
            data,
        });
    }
    async findByToken(token) {
        return prisma.session.findUnique({
            where: { token },
            include: {
                user: true,
            },
        });
    }
    async deleteByToken(token) {
        await prisma.session.deleteMany({
            where: { token },
        });
    }
    async deleteExpired() {
        await prisma.session.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date(),
                },
            },
        });
    }
    async deleteByUserId(userId) {
        await prisma.session.deleteMany({
            where: { userId },
        });
    }
}
//# sourceMappingURL=session.repository.js.map