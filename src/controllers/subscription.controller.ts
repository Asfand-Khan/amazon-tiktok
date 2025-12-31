import { Request, Response } from 'express';
import { SubscriptionService } from '../services/subscription.service.js';
import { ClientRepository } from '../repositories/client.repository.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/AppError.js';

const subscriptionService = new SubscriptionService();
const clientRepository = new ClientRepository();

export const createSubscription = catchAsync(
  async (req: Request, res: Response) => {
    // If admin, they can pass clientId. If user, use their own client ID.
    let clientId = req.body.clientId;

    if (!clientId && req.user.role === 'CLIENT') {
      const client = await clientRepository.findByUserId(req.user.id);
      if (!client)
        throw new AppError('Client profile not found for this user', 404);
      clientId = client.id;
    }

    if (!clientId) {
      throw new AppError('ClientId is required', 400);
    }

    const subscription = await subscriptionService.createSubscription({
      planId: req.body.planId,
      clientId: clientId,
    });

    res.status(201).json({
      success: true,
      message: 'Subscription created successfully',
      payload: subscription,
    });
  }
);

export const getAllSubscriptions = catchAsync(
  async (req: Request, res: Response) => {
    const subscriptions = await subscriptionService.getAllSubscriptions();

    res.status(200).json({
      success: true,
      message: 'Subscriptions fetched successfully',
      payload: subscriptions,
    });
  }
);

export const getSubscriptionById = catchAsync(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const subscription = await subscriptionService.getSubscriptionById(id);

    res.status(200).json({
      success: true,
      message: 'Subscription fetched successfully',
      payload: subscription,
    });
  }
);

export const getMySubscription = catchAsync(
  async (req: Request, res: Response) => {
    const subscription = await subscriptionService.getMySubscription(
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: 'My subscription fetched successfully',
      payload: subscription,
    });
  }
);

export const updateSubscription = catchAsync(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const subscription = await subscriptionService.updateSubscription(
      id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: 'Subscription updated successfully',
      payload: subscription,
    });
  }
);

export const cancelSubscription = catchAsync(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    await subscriptionService.cancelSubscription(id, req.user.id);

    res.status(200).json({
      success: true,
      message: 'Subscription cancelled successfully',
      payload: null,
    });
  }
);
