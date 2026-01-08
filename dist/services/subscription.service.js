import { SubscriptionRepository } from '../repositories/subscription.repository.js';
import { PlanRepository } from '../repositories/plan.repository.js';
import { ClientRepository } from '../repositories/client.repository.js';
import { AppError } from '../utils/AppError.js';
const subscriptionRepository = new SubscriptionRepository();
const planRepository = new PlanRepository();
const clientRepository = new ClientRepository();
export class SubscriptionService {
    async createSubscription(data) {
        const plan = await planRepository.findById(data.planId);
        if (!plan) {
            throw new AppError('Plan not found', 404);
        }
        const client = await clientRepository.findById(data.clientId);
        if (!client) {
            throw new AppError('Client not found', 404);
        }
        const existingSubscription = await subscriptionRepository.findActiveByClientId(data.clientId);
        if (existingSubscription) {
            throw new AppError('Client already has an active subscription', 400);
        }
        const startDate = new Date();
        let endDate = new Date();
        if (plan.interval === 'MONTHLY') {
            endDate.setMonth(endDate.getMonth() + 1);
        }
        else if (plan.interval === 'QUARTERLY') {
            endDate.setMonth(endDate.getMonth() + 3);
        }
        else if (plan.interval === 'YEARLY') {
            endDate.setFullYear(endDate.getFullYear() + 1);
        }
        else {
            endDate = null;
        }
        const subscriptionData = {
            plan: { connect: { id: plan.id } },
            client: { connect: { id: client.id } },
            startDate,
            endDate,
            status: 'ACTIVE',
            autoRenew: true,
        };
        await clientRepository.update(client.id, {
            usageLimit: plan.usageLimit,
        });
        return subscriptionRepository.create(subscriptionData);
    }
    async getAllSubscriptions() {
        return subscriptionRepository.findAll({});
    }
    async getSubscriptionById(id) {
        const subscription = await subscriptionRepository.findById(id);
        if (!subscription) {
            throw new AppError('Subscription not found', 404);
        }
        return subscription;
    }
    async getMySubscription(userId) {
        const client = await clientRepository.findByUserId(userId);
        if (!client) {
            throw new AppError('Client not found', 404);
        }
        return subscriptionRepository.findActiveByClientId(client.id);
    }
    async updateSubscription(id, data) {
        const subscription = await subscriptionRepository.findById(id);
        if (!subscription) {
            throw new AppError('Subscription not found', 404);
        }
        return subscriptionRepository.update(id, data);
    }
    async cancelSubscription(id, userId) {
        const subscription = await subscriptionRepository.findById(id);
        if (!subscription) {
            throw new AppError('Subscription not found', 404);
        }
        return subscriptionRepository.update(id, {
            status: 'CANCELLED',
            cancelledAt: new Date(),
            autoRenew: false,
        });
    }
}
//# sourceMappingURL=subscription.service.js.map