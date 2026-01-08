import express from 'express';
import * as clientController from '../controllers/client.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';
const router = express.Router();
router.use(protect);
router.get('/dashboard', clientController.getDashboardData);
router.post('/api-key/regenerate', clientController.regenerateApiKey);
router.use(restrictTo('SUPER_ADMIN', 'ADMIN'));
router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getClientById);
router.patch('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);
export default router;
//# sourceMappingURL=client.routes.js.map