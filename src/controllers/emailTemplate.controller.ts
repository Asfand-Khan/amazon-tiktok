import { Request, Response } from 'express';
import { EmailTemplateService } from '../services/emailTemplate.service.js';
import { catchAsync } from '../utils/catchAsync.js';

const emailTemplateService = new EmailTemplateService();

export const createTemplate = catchAsync(
  async (req: Request, res: Response) => {
    const template = await emailTemplateService.createTemplate(req.body);

    res.status(201).json({
      success: true,
      message: 'Template created successfully',
      payload: template,
    });
  }
);

export const getAllTemplates = catchAsync(
  async (req: Request, res: Response) => {
    const templates = await emailTemplateService.getAllTemplates();

    res.status(200).json({
      success: true,
      message: 'Templates fetched successfully',
      payload: templates,
    });
  }
);

export const getTemplateById = catchAsync(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const template = await emailTemplateService.getTemplateById(id);

    res.status(200).json({
      success: true,
      message: 'Template fetched successfully',
      payload: template,
    });
  }
);

export const updateTemplate = catchAsync(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const template = await emailTemplateService.updateTemplate(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Template updated successfully',
      payload: template,
    });
  }
);
