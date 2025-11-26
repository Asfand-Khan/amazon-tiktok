import { PrismaClient } from '@prisma/client/extension';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
async function main() {
    const adminEmail = 'superadmin@example.com';
    const adminPassword = 'superadmin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            password: hashedPassword,
            firstName: 'Super',
            lastName: 'Admin',
            role: 'SUPER_ADMIN',
            status: 'ACTIVE',
            emailVerified: true,
        },
    });
    console.log({ admin });
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map