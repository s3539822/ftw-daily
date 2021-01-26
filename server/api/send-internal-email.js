const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.GMAIL_EMAIL_KEY,
    pass: process.env.GMAIL_API_KEY,
  },
  secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

module.exports = async (req, res) => {
  const {f_name, l_name, email, message} = req.body

  const mailData = {
    from: email,
    to: 'j.beresh@hotmail.com',
    subject: 'CampWhere Contact Us Form Submission',
    html: `New message from ${f_name} ${l_name}, <br/><br/>Message: ${message}<br/><br/>Email: ${email}`,
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
}


