var nodemailer = require('nodemailer');

module.exports = (req, res) => {


  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jeremyb808@gmail.com',
      pass: 'Iloveamy&nate1996'
    }
  });

  var mailOptions = {
    from: 'jeremyb808@gmail.com',
    to: 'jeremyb808@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
