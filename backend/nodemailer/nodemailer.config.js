// nodemailer.config.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: 'gmail', // You can replace 'gmail' with another service if you choose another SMTP provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use App Password if 2FA is enabled
  },
});

export const sender = {
  email: process.env.EMAIL_USER,
  name: 'Auth App Test',
};
