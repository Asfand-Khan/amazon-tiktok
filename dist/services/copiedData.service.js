import { CopiedDataRepository } from '../repositories/copiedData.repository.js';
import { ClientRepository } from '../repositories/client.repository.js';
import { SubscriptionRepository } from '../repositories/subscription.repository.js';
import { AppError } from '../utils/AppError.js';
import { Prisma } from '@/generated/client.js';
const copiedDataRepository = new CopiedDataRepository();
const clientRepository = new ClientRepository();
const subscriptionRepository = new SubscriptionRepository();
export class CopiedDataService {
    async saveCopiedData(userId, data) {
        const client = await clientRepository.findByUserId(userId);
        if (!client) {
            throw new AppError('Client account not found', 404);
        }
        if (client.usageLimit > 0 && client.usageCount >= client.usageLimit) {
            throw new AppError('Usage limit reached. Please upgrade your plan.', 403);
        }
        const copiedDataInput = {
            client: { connect: { id: client.id } },
            productTitle: data.productTitle,
            productAsin: data.productAsin,
            productPrice: data.productPrice
                ? new Prisma.Decimal(data.productPrice)
                : null,
            productImage: data.productImage,
            productUrl: data.productUrl,
            productData: data.productData,
            tiktokShopUrl: data.tiktokShopUrl,
            tiktokStatus: data.tiktokStatus,
            copiedFrom: data.copiedFrom || 'Extension',
            userAgent: data.userAgent,
        };
        const savedData = await copiedDataRepository.create(copiedDataInput);
        await clientRepository.update(client.id, {
            usageCount: { increment: 1 },
            lastUsedAt: new Date(),
        });
        return savedData;
    }
    async getMyCopiedData(userId) {
        const client = await clientRepository.findByUserId(userId);
        if (!client) {
            throw new AppError('Client account not found', 404);
        }
        return copiedDataRepository.findAllByClientId(client.id);
    }
    async getCopiedDataById(id, userId) {
        const data = await copiedDataRepository.findById(id);
        if (!data) {
            throw new AppError('Data not found', 404);
        }
        const client = await clientRepository.findByUserId(userId);
        if (!client || data.clientId !== client.id) {
            throw new AppError('Not authorized to view this data', 403);
        }
        return data;
    }
    async getAnyCopiedDataById(id) {
        const data = await copiedDataRepository.findById(id);
        if (!data)
            throw new AppError('Data not found', 404);
        return data;
    }
    async updateCopiedData(id, userId, data) {
        const existing = await copiedDataRepository.findById(id);
        if (!existing) {
            throw new AppError('Data not found', 404);
        }
        const client = await clientRepository.findByUserId(userId);
        if (!client || existing.clientId !== client.id) {
            throw new AppError('Not authorized to edit this data', 403);
        }
        return copiedDataRepository.update(id, data);
    }
    async deleteCopiedData(id, userId) {
        const existing = await copiedDataRepository.findById(id);
        if (!existing) {
            throw new AppError('Data not found', 404);
        }
        const client = await clientRepository.findByUserId(userId);
        if (!client || existing.clientId !== client.id) {
            throw new AppError('Not authorized to delete this data', 403);
        }
        return copiedDataRepository.delete(id);
    }
}
//# sourceMappingURL=copiedData.service.js.map