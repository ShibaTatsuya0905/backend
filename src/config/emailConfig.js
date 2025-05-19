const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail', 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify(function (error, success) {
  if (error) {
    console.error("Nodemailer transporter verification error:", error.message);
    console.error("Hint: Check your EMAIL_USER and EMAIL_PASS in .env, and Gmail 'App Password' or 'Less Secure App Access' settings.");
  } else {
    console.log("Nodemailer transporter is ready to send emails from:", process.env.EMAIL_USER);
  }
});


const sendMail = async (to, subject, htmlContent) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Email credentials (EMAIL_USER, EMAIL_PASS) are not set in .env file.');
        return false;
    }
    try {
        await transporter.sendMail({
            from: `"Anime Manga Blog" <${process.env.EMAIL_USER}>`,
            to: to, 
            subject: subject, 
            html: htmlContent, 
        });
        console.log('Email sent successfully to:', to);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        if (error.responseCode) {
            console.error('Email sending failed with response code:', error.responseCode);
            console.error('Response:', error.response);
        }
        return false;
    }
};

module.exports = { sendMail, transporter };