import { Resend } from 'resend';

export class EmailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendWelcomeEmail(email: string, name: string) {
    try {
      await this.resend.emails.send({
        from: 'onboarding@resend.dev', // Use this default testing domain
        to: email,
        subject: 'Welcome to ApniSec - Secure Your World',
        html: `
          <div style="font-family: sans-serif; color: #333;">
            <h1>Welcome, ${name}! 🛡️</h1>
            <p>Thank you for joining <strong>ApniSec</strong>. We are thrilled to help you secure your digital assets.</p>
            <p>You can now access your dashboard to:</p>
            <ul>
              <li>Report Vulnerabilities</li>
              <li>Request VAPT Audits</li>
              <li>Monitor Cloud Security</li>
            </ul>
            <br>
            <a href="http://localhost:3000/dashboard" style="background: #00ffa3; color: black; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
            <p style="font-size: 12px; color: #666; margin-top: 20px;">ApniSec Security Team</p>
          </div>
        `
      });
      console.log(`✅ Email sent to ${email}`);
    } catch (error) {
      console.error("❌ Failed to send email:", error);
      // We don't throw error here because we don't want to break registration if email fails
    }
  }


  async sendIssueCreatedEmail(email: string, title: string, id: string) {
    try {
      await this.resend.emails.send({
        from: 'alerts@resend.dev',
        to: email,
        subject: `Issue Reported: ${title}`,
        html: `
          <div style="font-family: sans-serif; color: #333;">
            <h2 style="color: #d9534f;">New Security Issue Reported</h2>
            <p><strong>Issue ID:</strong> ${id}</p>
            <p><strong>Title:</strong> ${title}</p>
            <p>Our security team has received your report and is investigating.</p>
          </div>
        `
      });
    } catch (error) {
      console.error("Failed to send issue email", error);
    }
  }

  async sendProfileUpdatedEmail(email: string, name: string) {
    try {
      await this.resend.emails.send({
        from: 'security@resend.dev',
        to: email,
        subject: 'Security Alert: Profile Updated',
        html: `
          <div style="font-family: sans-serif; color: #333;">
            <h2>Profile Updated</h2>
            <p>Hello ${name},</p>
            <p>Your profile details were recently updated. If this wasn't you, please contact support immediately.</p>
          </div>
        `
      });
    } catch (error) {
      console.error("Failed to send profile email", error);
    }
  }
}