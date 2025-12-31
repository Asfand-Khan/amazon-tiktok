import { Request, Response } from 'express';
import { ContentService } from '../services/content.service.js';
import { catchAsync } from '../utils/catchAsync.js';

const contentService = new ContentService();

export const createContent = catchAsync(async (req: Request, res: Response) => {
  const content = await contentService.createContent(req.body);

  res.status(201).json({
    success: true,
    message: 'Content created successfully',
    payload: content,
  });
});

export const getAllContent = catchAsync(async (req: Request, res: Response) => {
  const publicOnly = req.query.publicOnly === 'true';
  const contents = await contentService.getAllContent(publicOnly);

  res.status(200).json({
    success: true,
    message: 'Contents fetched successfully',
    payload: contents,
  });
});

export const getContentById = catchAsync(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const content = await contentService.getContentById(id);

    res.status(200).json({
      success: true,
      message: 'Content fetched successfully',
      payload: content,
    });
  }
);

export const updateContent = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const content = await contentService.updateContent(id, req.body);

  res.status(200).json({
    success: true,
    message: 'Content updated successfully',
    payload: content,
  });
});

export const deleteContent = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  await contentService.deleteContent(id);

  res.status(204).json({
    success: true,
    message: 'Content deleted successfully',
    payload: null,
  });
});
