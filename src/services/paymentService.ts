import Payment from '../models/paymentModel';
import { sendNotification } from '../utils/notifications'; // Utility for email/SMS notifications

class PaymentService {
  // Create a new payment
  static async createPayment(orderId: string, userId: string, amount: number, phoneNumber: string) {
    const payment = await Payment.create({
      orderId,
      userId,
      amount,
      status: 'Pending',
      phoneNumber, // Store the phone number for future notifications
    });
    return payment;
  }

  // Verify payment status and update
  static async verifyPayment(transactionId: string, status: string) {
    const payment = await Payment.findOne({ where: { transactionId } });
    if (!payment) throw new Error('Payment not found');
    payment.status = status;
    payment.paymentDate = new Date();
    await payment.save();

    // Send notification on successful payment
    if (status === 'Success') {
      // Sending SMS notification based on the stored phone number
      await sendNotification(payment.userId, 'Payment Successful', `Your payment of ${payment.amount} was successful.`, {
        phoneNumber: payment.phoneNumber, // Use the phone number from the payment record
        subject: 'Payment Successful',
        message: `Your payment of ${payment.amount} was successful.`
      });
    }

    return payment;
  }

  // Fetch payment by ID
  static async getPaymentById(paymentId: string) {
    const payment = await Payment.findByPk(paymentId);
    if (!payment) throw new Error('Payment not found');
    return payment;
  }

  // Fetch payments by user
  static async getPaymentsByUser(userId: string) {
    const payments = await Payment.findAll({ where: { userId } });
    return payments;
  }

  // Fetch payments by order
  static async getPaymentsByOrder(orderId: string) {
    const payments = await Payment.findAll({ where: { orderId } });
    return payments;
  }

  // List all payments (Admin)
  static async listAllPayments() {
    const payments = await Payment.findAll();
    return payments;
  }

  // Retry payment
  static async retryPayment(paymentId: string) {
    const payment = await Payment.findByPk(paymentId);
    if (!payment) throw new Error('Payment not found');
    if (payment.status === 'Success') throw new Error('Payment is already successful');

    // Logic to retry payment (e.g., re-initiate payment with MTN Mobile Money)
    payment.status = 'Pending'; // Reset to pending for retry
    await payment.save();

    return payment;
  }
}

export default PaymentService;
