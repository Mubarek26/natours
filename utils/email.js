import nodemailer from 'nodemailer';
const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: 'Abdulkerim Jemal <abdulkerimjemal.dev@gmail.com>',
    to: options.email, // Recipient's email
    subject: options.subject, // Subject of the email
    text: options.message, // Plain text message
    // html: options.html, // Optional: HTML message if needed
  };
  // 3. Send the email
  await transporter.sendMail(mailOptions);
};
export default sendEmail;