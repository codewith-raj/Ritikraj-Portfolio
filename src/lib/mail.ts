import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOTPEmail(to: string, otp: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Your Verification Code - Ritik Portfolio',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #000;">Verify Your Email</h2>
        <p>Thank you for reaching out! Please use the following One-Time Password (OTP) to verify your email address and send your message.</p>
        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; letter-spacing: 5px; font-weight: bold; margin: 20px 0;">
          ${otp}
        </div>
        <p>This code is valid for 10 minutes.</p>
        <p>If you didn't request this code, you can safely ignore this email.</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}

export async function sendContactMessage(name: string, email: string, message: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'Ritikrajunique111@gmail.com',
    replyTo: email,
    subject: `New Contact Message from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="border-bottom: 2px solid #eee; padding-bottom: 10px;">New Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #333;">
          ${message.replace(/\n/g, '<br>')}
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}
