import express from 'express';
import PaymentController from '../controllers/paymentController';

const router = express.Router();

// Utility to handle async errors
const asyncHandler = (fn: Function) => 
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Define routes with asyncHandler
router.post('/createPayment', asyncHandler(PaymentController.createPayment));

router.post('/verifyPayment', asyncHandler(PaymentController.verifyPayment));

router.get('/getPaymentById/:id', asyncHandler(PaymentController.getPaymentById));

router.get('/getPaymentsByUser/:userId', asyncHandler(PaymentController.getPaymentsByUser));

router.get('/getPaymentsByOrder/:orderId', asyncHandler(PaymentController.getPaymentsByOrder));

router.get('/listAllPayments', asyncHandler(PaymentController.listAllPayments));

router.post('/retryPayment/:id', asyncHandler(PaymentController.retryPayment));

export default router;
