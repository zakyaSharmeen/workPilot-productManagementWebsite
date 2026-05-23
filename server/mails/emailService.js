// import nodemailer from 'nodemailer';
// import otpEmailTemplate from './otpEmailTemplate.js';

// const transporter = nodemailer.createTransport({
//   host:   process.env.EMAIL_HOST,
//   port:   parseInt(process.env.EMAIL_PORT, 10) || 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendEmail = async ({ to, subject, html }) => {
//   await transporter.sendMail({ from: process.env.EMAIL_FROM, to, subject, html });
// };

// export const sendOTPEmail = async (user, otp) => {
//   const expiresMinutes = parseInt(process.env.OTP_EXPIRES_MINUTES, 10) || 10;
//   await sendEmail({
//     to: user.email,
//     subject: 'Verify Your Email — OTP',
//     html: otpEmailTemplate(user.name, otp, expiresMinutes),
//   });
// };

// import nodemailer from "nodemailer";
// import otpEmailTemplate from "./otpEmailTemplate.js";

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   connectionTimeout: 10000,
//   greetingTimeout: 10000,
//   socketTimeout: 10000,
// });

// const sendEmail = async ({ to, subject, html }) => {
//   await transporter.sendMail({
//     from: process.env.EMAIL_FROM,
//     to,
//     subject,
//     html,
//   });
// };

// export const sendOTPEmail = async (user, otp) => {
//   const expiresMinutes = parseInt(process.env.OTP_EXPIRES_MINUTES, 10) || 10;
//   await sendEmail({
//     to: user.email,
//     subject: "Verify Your Email — OTP",
//     html: otpEmailTemplate(user.name, otp, expiresMinutes),
//   });
// };
import { Resend } from "resend";
import otpEmailTemplate from "./otpEmailTemplate.js";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPEmail = async (user, otp) => {
  const expiresMinutes = parseInt(process.env.OTP_EXPIRES_MINUTES, 10) || 10;
  await resend.emails.send({
    from: "WorkPilot <onboarding@resend.dev>",
    to: user.email,
    subject: "Verify Your Email — OTP",
    html: otpEmailTemplate(user.name, otp, expiresMinutes),
  });
};
