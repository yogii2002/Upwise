const Sib = require("sib-api-v3-sdk");

const mailSender = async (email, title, body) => {
  try {
    // Initialize Brevo client with API key
    const client = Sib.ApiClient.instance;
    client.authentications["api-key"].apiKey = process.env.MAIL_PASS;

    const tranEmailApi = new Sib.TransactionalEmailsApi();

    const sender = { 
      name: "Upwise | Growing up with wisdom", 
      email: "yogeshnimcet2023@gmail.com" // must be verified sender in Brevo
    };

    const receivers = [{ email }];

    // Send transactional email
    const response = await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: title,
      htmlContent: body,
    });

    console.log("✅ Email sent successfully via Brevo API:", response.messageId || "OK");
    return response;
  } catch (error) {
    console.error("❌ Mail send failed via Brevo API:", error.message);
    return error.message;
  }
};

module.exports = mailSender;
