import nodemailer from 'nodemailer';
import otpEmailTemplate from './otpEmailTemplate.js';

const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST,
  port:   parseInt(process.env.EMAIL_PORT, 10) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({ from: process.env.EMAIL_FROM, to, subject, html });
};

export const sendOTPEmail = async (user, otp) => {
  const expiresMinutes = parseInt(process.env.OTP_EXPIRES_MINUTES, 10) || 10;
  await sendEmail({
    to: user.email,
    subject: 'Verify Your Email — OTP',
    html: otpEmailTemplate(user.name, otp, expiresMinutes),
  });
};

