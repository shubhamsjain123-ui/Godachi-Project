const nodemailer = require('nodemailer');
const Transport = require("nodemailer-sendinblue-transport");
const EmailTemplate = require('email-templates');

const emailLog = require('../models/emailLog');

global.emailTest = false;

//smtp transporter
/* const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  ignoreTLS: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  pool: true,
  rateLimit: 50
}); */

const transporter = nodemailer.createTransport(
  new Transport({ apiKey: process.env.SEND_IN_BLUE_API_KEY })
);


// Email template
const email = new EmailTemplate({
  transport: transporter,
  send: true,
  preview: false,
  views: {
    options: {
      extension: 'ejs',
    },
  },
});

// Send email with specified template and body
exports.sendEmail = async (template, data) => {
  // Set analytics attributes
  data.baseURL = process.env.WEB_URL;
  data.to.forEach(async (receiver) => {
    // Log sent emails
    try {
      const log = await new emailLog({
        emailType: template,
        to: receiver,
        time: new Date()
      }).save();
      data._id = log._id;
    } catch (error) {
      console.error(error);
    }
    try {
      const emailSentResponse = await email.send({
        template: template,
        message: {
          from: '"Godachi" <contact@godachi.com>',
          //replyTo: 'contact@godachi.com',
          inReplyTo: data._id,
          to: receiver,
          attachments: data.attachments
        },
        locals: {
          data
        }
      });
    } catch (error) {
      console.log(error);
    }

  });
}
