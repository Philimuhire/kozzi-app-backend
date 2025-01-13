import sgMail from '@sendgrid/mail';
import twilio from 'twilio';

// Configure SendGrid (for email notifications)
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// Configure Twilio (for SMS notifications)
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID || '',
  process.env.TWILIO_AUTH_TOKEN || ''
);

interface NotificationOptions {
  email?: string;
  phoneNumber?: string;
  subject: string;
  message: string;
}

export async function sendNotification(userId: string, subject: string, message: string, options: NotificationOptions) {
  try {
    // Send Email Notification (if email is provided)
    if (options.email) {
      await sgMail.send({
        to: options.email,
        from: process.env.SENDGRID_FROM_EMAIL || 'philimuhire@gmail.com',
        subject,
        text: message,
      });
      console.log(`Email sent to ${options.email}`);
    }

    // Send SMS Notification (if phoneNumber is provided)
    if (options.phoneNumber) {
      await twilioClient.messages.create({
        body: `${subject}: ${message}`,
        from: process.env.TWILIO_PHONE_NUMBER || '0789058711', // Your Twilio phone number
        to: options.phoneNumber,
      });
      console.log(`SMS sent to ${options.phoneNumber}`);
    }
  } catch (error: any) {
    console.error('Notification Error:', error.message);
    throw new Error('Failed to send notification');
  }
}
