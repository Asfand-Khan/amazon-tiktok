import { SubscriptionRepository } from '../repositories/subscription.repository.js';
import { PlanRepository } from '../repositories/plan.repository.js';
import { ClientRepository } from '../repositories/client.repository.js';
import { AppError } from '../utils/AppError.js';
import { Prisma } from '@/generated/client.js';

const subscriptionRepository = new SubscriptionRepository();
const planRepository = new PlanRepository();
const clientRepository = new ClientRepository();

export class SubscriptionService {
  async createSubscription(data: { planId: number; clientId: number }) {
    const plan = await planRepository.findById(data.planId);
    if (!plan) {
      throw new AppError('Plan not found', 404);
    }

    const client = await clientRepository.findById(data.clientId);
    if (!client) {
      throw new AppError('Client not found', 404);
    }

    // Check if valid subscription exists
    const existingSubscription =
      await subscriptionRepository.findActiveByClientId(data.clientId);
    if (existingSubscription) {
      throw new AppError('Client already has an active subscription', 400);
    }

    // Calculate dates based on plan interval
    const startDate = new Date();
    let endDate = new Date();

    if (plan.interval === 'MONTHLY') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (plan.interval === 'QUARTERLY') {
      endDate.setMonth(endDate.getMonth() + 3);
    } else if (plan.interval === 'YEARLY') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      // LIFETIME
      endDate = null as any;
    }

    const subscriptionData: Prisma.SubscriptionCreateInput = {
      plan: { connect: { id: plan.id } },
      client: { connect: { id: client.id } },
      startDate,
      endDate,
      status: 'ACTIVE', // Assuming direct activation for now, later integrate payment
      autoRenew: true,
    };

    // Update client limits
    await clientRepository.update(client.id, {
      usageLimit: plan.usageLimit,
    });

    return subscriptionRepository.create(subscriptionData);
  }

  async getAllSubscriptions() {
    return subscriptionRepository.findAll({});
  }

  async getSubscriptionById(id: number) {
    const subscription = await subscriptionRepository.findById(id);
    if (!subscription) {
      throw new AppError('Subscription not found', 404);
    }
    return subscription;
  }

  async getMySubscription(userId: number) {
    const client = await clientRepository.findByUserId(userId);
    if (!client) {
      throw new AppError('Client not found', 404);
    }
    return subscriptionRepository.findActiveByClientId(client.id);
  }

  async updateSubscription(id: number, data: Prisma.SubscriptionUpdateInput) {
    const subscription = await subscriptionRepository.findById(id);
    if (!subscription) {
      throw new AppError('Subscription not found', 404);
    }
    return subscriptionRepository.update(id, data);
  }

  async cancelSubscription(id: number, userId: number) {
    // Verify ownership or admin
    const subscription = await subscriptionRepository.findById(id);
    if (!subscription) {
      throw new AppError('Subscription not found', 404);
    }

    // In a real app we'd verify if the userId owns this subscription's client

    return subscriptionRepository.update(id, {
      status: 'CANCELLED',
      cancelledAt: new Date(),
      autoRenew: false,
    });
  }
}
