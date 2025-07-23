import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"HostelBuddy" <${process.env.EMAIL_FROM}>`, // ✅ Good formatting
      to,
      subject,
      html: `<p>${message}</p>`, // ✅ Safe and valid HTML
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully to:', to);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

export default sendEmail;
