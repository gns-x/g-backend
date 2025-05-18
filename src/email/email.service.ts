import { createTransport } from 'nodemailer';
import { generatePickupRequestTemplate } from './emailTemplate';

const transporter = createTransport({
  host: process.env.SMTP_HOST ,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: ,
    pass: ,
  },
});

export class EmailService {
  private async sendEmail(to: string, subject: string, html: string) {
    try {
      await transporter.sendMail({
        from: '"School" <pickup-system@school.com>',
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
