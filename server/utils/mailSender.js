const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    // 🔹 Create transporter for Brevo
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // smtp-relay.brevo.com
      port: 587, // ✅ Always 587 for Brevo
      secure: false, // ✅ STARTTLS
      auth: {
        user: process.env.MAIL_USER, // your Brevo account email
        pass: process.env.MAIL_PASS, // your SMTP key
      },
      tls: {
        rejectUnauthorized: false, // ✅ Important for Render SSL/firewall
      },
    });

    // Optional — verify SMTP connection before sending
    await transporter.verify();
    console.log("✅ SMTP connection verified with Brevo");

    // 🔹 Send the mail
    let info = await transporter.sendMail({
      from: `"Upwise | Growing up with wisdom" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("✅ Email sent successfully:", info.messageId || info.response);
    return info;
  } catch (error) {
    console.error("❌ Mail send failed:", error.message);
    return error.message;
  }
};

module.exports = mailSender;
