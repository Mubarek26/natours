import nodemailer from 'nodemailer';
import pug from 'pug';
import {htmlToText}  from 'html-to-text';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export default class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url; // URL to include in the email
    this.from = `Abdulkerim Jemal <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Use SendGrid or another service in production
      return 1;
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // 1. Render HTML based on a template
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const html = pug.renderFile(
      join(__dirname, '..', 'views', 'email', `${template}.pug`),
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );
    // 2. Define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html,
      text: htmlToText(html),
    };

    // 3. Create a transport and send the email
    await this.newTransport().sendMail(mailOptions);
  }
  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family!');
  }
}
