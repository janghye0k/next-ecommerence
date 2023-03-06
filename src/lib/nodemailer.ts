import nodemailer from 'nodemailer'

export default function createTransporter() {
  return nodemailer.createTransport({
    service: 'Gmail',
    port: 587,
    host: 'smtp.gmail.com',
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  })
}
