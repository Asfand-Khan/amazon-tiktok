import express from 'express';
import * as emailTemplateController from '../controllers/emailTemplate.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createEmailTemplateSchema, updateEmailTemplateSchema, } from '../validations/emailTemplate.validation.js';
const router = express.Router();
router.use(protect, restrictTo('SUPER_ADMIN'));
router.post('/', validate(createEmailTemplateSchema), emailTemplateController.createTemplate);
router.get('/', emailTemplateController.getAllTemplates);
router.get('/:id', emailTemplateController.getTemplateById);
router.patch('/:id', validate(updateEmailTemplateSchema), emailTemplateController.updateTemplate);
export default router;
//# sourceMappingURL=emailTemplate.routes.js.map