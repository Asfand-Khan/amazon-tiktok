import { Request, Response } from 'express';
import { ClientService } from '../services/client.service.js';
import { catchAsync } from '../utils/catchAsync.js';

const clientService = new ClientService();

export const getDashboardData = catchAsync(
  async (req: Request, res: Response) => {
    const data = await clientService.getDashboardData(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Dashboard data fetched successfully',
      payload: data,
    });
  }
);

export const regenerateApiKey = catchAsync(
  async (req: Request, res: Response) => {
    const data = await clientService.regenerateApiKey(req.user.id);

    res.status(200).json({
      success: true,
      message: 'API Key regenerated successfully',
      payload: data,
    });
  }
);

export const getAllClients = catchAsync(async (req: Request, res: Response) => {
  const clients = await clientService.getAllClients();
  res.status(200).json({
    success: true,
    message: 'Clients fetched successfully',
    payload: clients,
  });
});

export const getClientById = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const client = await clientService.getClientById(id);
  res.status(200).json({
    success: true,
    message: 'Client fetched successfully',
    payload: client,
  });
});

export const updateClient = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const client = await clientService.updateClient(id, req.body);
  res.status(200).json({
    success: true,
    message: 'Client updated successfully',
    payload: client,
  });
});

export const deleteClient = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await clientService.deleteClient(id);
  res.status(204).json({
    success: true,
    message: 'Client deleted successfully',
    payload: null,
  });
});
