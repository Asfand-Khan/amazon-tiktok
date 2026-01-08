import express from 'express';
import * as copiedDataController from '../controllers/copiedData.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createCopiedDataSchema, updateCopiedDataSchema, } from '../validations/copiedData.validation.js';
const router = express.Router();
router.use(protect);
router.post('/', validate(createCopiedDataSchema), copiedDataController.createCopiedData);
router.get('/', copiedDataController.getMyCopiedData);
router.get('/:id', copiedDataController.getCopiedDataById);
router.patch('/:id', validate(updateCopiedDataSchema), copiedDataController.updateCopiedData);
router.delete('/:id', copiedDataController.deleteCopiedData);
export default router;
//# sourceMappingURL=copiedData.routes.js.map