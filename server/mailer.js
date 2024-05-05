const nodemailer = require('nodemailer');

function sendEmail(email, code) {
  return new Promise((resolve, reject) => {
    const mailText = `

Код подтверждения адреса электронной почты: ${code}
    `;

    const mailOptions = {
      from: 'krasava1081@gmail.com',
      to: email,
      subject: `Код подтверждения EksamLab`,
      text: mailText
    };

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: 'krasava1081@gmail.com',
        pass: 'gkaztbcfuetaytgo'
      }
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Mail error:', error.message);
        reject(error);
      } else {
        console.log('Mail success:', info.response);
        resolve(info);
      }
    });
  });
}

module.exports = { sendEmail };
