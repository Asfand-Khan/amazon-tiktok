import { Request, Response } from 'express';
import { PaymentService } from '../services/payment.service.js';
import { ClientRepository } from '../repositories/client.repository.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/AppError.js';

const paymentService = new PaymentService();
const clientRepository = new ClientRepository();

export const createPayment = catchAsync(async (req: Request, res: Response) => {
  let clientId = req.body.clientId;

  if (!clientId && req.user.role === 'CLIENT') {
    const client = await clientRepository.findByUserId(req.user.id);
    if (!client) throw new AppError('Client profile not found', 404);
    clientId = client.id;
  }

  if (!clientId) throw new AppError('ClientId is required', 400);

  const payment = await paymentService.createPayment({
    ...req.body,
    clientId,
  });

  res.status(201).json({
    success: true,
    message: 'Payment created successfully',
    payload: payment,
  });
});

export const getAllPayments = catchAsync(
  async (req: Request, res: Response) => {
    const payments = await paymentService.getAllPayments();

    res.status(200).json({
      success: true,
      message: 'Payments fetched successfully',
      payload: payments,
    });
  }
);

export const getMyPayments = catchAsync(async (req: Request, res: Response) => {
  const payments = await paymentService.getMyPayments(req.user.id);

  res.status(200).json({
    success: true,
    message: 'My payments fetched successfully',
    payload: payments,
  });
});

export const getPaymentById = catchAsync(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const payment = await paymentService.getPaymentById(id);

    res.status(200).json({
      success: true,
      message: 'Payment fetched successfully',
      payload: payment,
    });
  }
);

export const updatePayment = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const payment = await paymentService.updatePayment(id, req.body);

  res.status(200).json({
    success: true,
    message: 'Payment updated successfully',
    payload: payment,
  });
});
