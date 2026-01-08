import express from 'express';
import * as contentController from '../controllers/content.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createContentSchema, updateContentSchema, } from '../validations/content.validation.js';
const router = express.Router();
router.get('/', contentController.getAllContent);
router.get('/:id', contentController.getContentById);
router.use(protect, restrictTo('SUPER_ADMIN', 'ADMIN'));
router.post('/', validate(createContentSchema), contentController.createContent);
router.patch('/:id', validate(updateContentSchema), contentController.updateContent);
router.delete('/:id', contentController.deleteContent);
export default router;
//# sourceMappingURL=content.routes.js.map