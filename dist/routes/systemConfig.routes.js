import express from 'express';
import * as systemConfigController from '../controllers/systemConfig.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createSystemConfigSchema, updateSystemConfigSchema, } from '../validations/systemConfig.validation.js';
const router = express.Router();
router.use(protect, restrictTo('SUPER_ADMIN'));
router.post('/', validate(createSystemConfigSchema), systemConfigController.createConfig);
router.get('/', systemConfigController.getAllConfigs);
router.get('/:key', systemConfigController.getConfigByKey);
router.patch('/:key', validate(updateSystemConfigSchema), systemConfigController.updateConfig);
export default router;
//# sourceMappingURL=systemConfig.routes.js.map