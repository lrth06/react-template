const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

///Send Email using NodeMailer
///Request should contain "name, email, content"

router.post("/", (req, res) => {
  const body = req.body;
  const name = body.name;
  const email = body.email;
  const content = body.content;
  const Sender = process.env.MAIL_SENDER;
  const Target = process.env.MAIL_RECIPIENT;
  const Password = process.env.MAIL_PASSWORD;
  const MailHost = process.env.MAIL_HOST;

  const transporter = nodemailer.createTransport({
    port: 465,
    host: MailHost,
    auth: {
      user: Sender,
      pass: Password,
    },
    secure: true,
  });

  const mailData = {
    from: `"${name}" <${Sender}>`,
    replyTo: email, // sender address
    to: Target, // list of receivers
    subject: `Message from ${name}`,

    html: `${content}`,
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
  res.json(mailData);
});

module.exports = router;
