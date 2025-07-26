import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for others
  auth: {
    user: process.env.EMAIL_FROM, // email address
    pass: process.env.EMAIL_PASSWORD, // app-specific password
  },
});

const sendEmail = async ({ to, subject, message }) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text: message,
    });
    console.log("✅ Email sent successfully");
  } catch (err) {
    console.error("❌ Failed to send email:", err.message);
  }
};

export default sendEmail;
