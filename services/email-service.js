const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

const defaultMailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: process.env.EMAIL_ADDRESS_TO_MULTIPLE,
    subject: 'Node.js ile gelen mail'
};

sentNotificationMail = (options = defaultHtmlMailOptions) => {
    transporter.sendMail(options, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

exports.sentHtmlBodyNotificationMail = (subject, body) => {
    const options = { ...defaultMailOptions, subject, html: body };    
    sentNotificationMail(options);
};

exports.sentErrorNotificationMail = () => {
    const options = { ...defaultMailOptions, subject:'Programda Hata', text:'Bir kontrol et istersen' };
    sentNotificationMail(options);
};