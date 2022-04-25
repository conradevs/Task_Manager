import nodemailer from "nodemailer";

export const emailRegister = async (data) => {
    const {email, name, token} = data;
    // TODO: Move to environment variables
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "9b5748f3716aed",
          pass: "35ac5670fec3e4"
        }
      });
    
    // Email info
    const info = await transport.sendMail({
        from: '"TaskManager - Project Administrator" <accounts@taskmanager.com>',
        to: email,
        subject: "TaskManager - Confirm your Account",
        text: "Confirm your new Account by clicking the following link",
        html: `<p>Hello: ${name} Validate your new TaskManager account</p>
        <p>Your account is almost ready, just click on this <a href="${process.env.FRONTEND_URL}/confirmation/${token}">link</a></p>
        <p>If you didn't create this account ignore this mail</p>
        `
    })
};

export const emailForgotPassword = async (data) => {
    const {email, name, token} = data;
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
    
    // Email info
    const info = await transport.sendMail({
        from: '"TaskManager - Project Administrator" <accounts@taskmanager.com>',
        to: email,
        subject: "TaskManager - New password confirmation",
        text: "Reset your password your password",
        html: `<p>Your new settings are almost ready, just click on this <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">link</a></p>
        <p>If you didn't ask to change your password ignore this mail</p>
        `
    })
};