const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

const defaulttextMailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: process.env.EMAIL_ADDRESS_TO_MULTIPLE,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

const defaultHtmlMailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: process.env.EMAIL_ADDRESS_TO_MULTIPLE,
    subject: 'Takvimde Boşluk Oluştu',
    html: '<h1>ACELE ET</h1><p>Takvimde boşluk oluştu!</p>'
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

exports.sentAvailableDatesNotificationMail = (dates) => {
    const options = { ...defaultHtmlMailOptions };
    for (const date of dates) {
        options.html += `<p>${date}</p>`;
    }
    sentNotificationMail(options);
};

exports.sentErrorNotificationMail = () => {
    const options = { ...defaulttextMailOptions, subject:'Programda Hata', text:'Bir kontrol et istersen' };
    sentNotificationMail(options);
};