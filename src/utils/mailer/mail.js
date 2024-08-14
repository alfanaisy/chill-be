const nodemailer = require('nodemailer');

// using ethereal mail for development & testing purposes
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'naomie.hoppe80@ethereal.email',
    pass: 'Hc78v4txtSZ4DdbmkP'
  }
});

const sendVerificationEmail = async (token) => {
  const info = await transporter.sendMail({
    from: "Chill App",
    to: "naomie.hoppe80@ethereal.email",
    subject: "Email Verification",
    html: `
      <p>Click the link below to verify your email:</p>
      <a href="http://localhost:5000/api/auth/verify-email?token=${token}">Verify Email</a>
    `,
  });

  console.log("Email sent: ", info);
}

module.exports = {
  sendVerificationEmail
}