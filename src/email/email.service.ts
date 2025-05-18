import { createTransport } from 'nodemailer';
import { generatePickupRequestTemplate } from './emailTemplate';

const transporter = createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: 'lacanteen@elitelac.com',
    pass: 'alxq jiai cjkh wkye',
  },
});

export class EmailService {
  private async sendEmail(to: string, subject: string, html: string) {
    try {
      await transporter.sendMail({
        from: '"London Academy" <pickup-system@elitelac.com>',
        to,
        subject,
        html,
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send email notification');
    }
  }

  async sendPickupRequestNotification(emailData: {
    studentName: string;
    studentGrade: string;
    studentClass: string;
    parentName: string;
    parentEmail: string;
    location: string;
  }) {
    const template = generatePickupRequestTemplate(emailData);

    await this.sendEmail(
      emailData.parentEmail,
      `Pickup Request Confirmation - ${emailData.studentName}`,
      template,
    );
  }
}
