import express from 'express';
import OrderController from '../controllers/orderController';

const router = express.Router();

const asyncHandler = (fn: Function) => 
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

router.post('/addOrder', asyncHandler(OrderController.createOrder));
router.get('/getAllOrders', asyncHandler(OrderController.getAllOrders));
router.get('/getOrder/:id', asyncHandler(OrderController.getOrderById));
router.put('/updateOrder/:id', asyncHandler(OrderController.updateOrder));
router.delete('/deleteOrder/:id', asyncHandler(OrderController.deleteOrder));

export default router;
