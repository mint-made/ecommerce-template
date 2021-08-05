import express from 'express';
const router = express.Router();
import {
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  placeOrder,
} from '../controllers/orderController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, isAdmin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/place').post(protect, placeOrder);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered);

export default router;
