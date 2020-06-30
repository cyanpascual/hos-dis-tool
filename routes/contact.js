var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: 'pgtodoc@up.edu.ph',
    pass: 'tzuqityvqjookwfq'
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var content = `Good day! A message is sent regarding the login feature for hospital personnel\n\nName: ${name} \nEmail: ${email} \nMessage/Concern: ${message} `

  var mail = {
    from: name,
    to: 'trams.upd@up.edu.ph',  //Change to email address that you want to receive messages on
    subject: 'New Message from Feedback Form - TrAMS LOGIN',
    text: content
  }

  var mail2 = {
    from: name,
    to: 'pgtodoc@up.edu.ph',  //Change to email address that you want to receive messages on
    subject: 'New Message from Feedback Form - TrAMS LOGIN',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })

  transporter.sendMail(mail2, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

module.exports = router;