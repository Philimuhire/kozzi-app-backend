import { Request, Response } from 'express';
import PaymentService from '../services/paymentService';

class PaymentController {
  // Create payment
  static async createPayment(req: Request, res: Response) {
    try {
      const { orderId, userId, amount, phoneNumber } = req.body; // Include phoneNumber in the request body
      const payment = await PaymentService.createPayment(orderId, userId, amount, phoneNumber); // Pass phoneNumber to the service
      res.status(201).json(payment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Verify payment
  static async verifyPayment(req: Request, res: Response) {
    try {
      const { transactionId, status } = req.body;
      const payment = await PaymentService.verifyPayment(transactionId, status);
      res.status(200).json(payment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get payment by ID
  static async getPaymentById(req: Request, res: Response) {
    try {
      const payment = await PaymentService.getPaymentById(req.params.id);
      res.status(200).json(payment);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  // Get payments by user
  static async getPaymentsByUser(req: Request, res: Response) {
    try {
      const payments = await PaymentService.getPaymentsByUser(req.params.userId);
      res.status(200).json(payments);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get payments by order
  static async getPaymentsByOrder(req: Request, res: Response) {
    try {
      const payments = await PaymentService.getPaymentsByOrder(req.params.orderId);
      res.status(200).json(payments);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // List all payments (Admin)
  static async listAllPayments(req: Request, res: Response) {
    try {
      const payments = await PaymentService.listAllPayments();
      res.status(200).json(payments);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Retry payment
  static async retryPayment(req: Request, res: Response) {
    try {
      const payment = await PaymentService.retryPayment(req.params.id);
      res.status(200).json(payment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default PaymentController;
