require('dotenv').config({
    path: './app/.env'
});
const nodemailer = require("nodemailer");

module.exports = {

    // PRODUCTION CONFIGURATION
    //===========================
    // transport: nodemailer.createTransport({
    //     host: process.env.ega_Mail_Host,
    //     port: process.env.ega_Mail_Port,
    //     secure: false,
    //     auth: {
    //         user: process.env.ega_Mail_User,
    //         pass: process.env.ega_Mail_Pass,
    //     },
    //     tls: {
    //         rejectUnauthorized: false,
    //     },
    // }),

    // DEVELOPMENT CONFIGURATION
    //===========================
    transport: nodemailer.createTransport({
        host: process.env.Mail_Host,
        port: process.env.Mail_Port,
        auth: {
            user: process.env.Mail_User,
            pass: process.env.Mail_Pass,
        }
    }),


    CREATE_USER_Mail(email, fullname, password) {
        return (mailOptions = {
            from: '"We Group of Company Team" <noreply@tbs.go.tz>',
            to: email,
            subject: "We ACCOUNT CREATED",
            text: "Hey there, it mail from We Group of Company ",
            html: "Hello! <b>" + fullname + " </b><br><br> Your account with the e-mail address: <b><i>" + email + "</i></b> has been created.<br><br>Please click the button below to login.<br><br>Initial password: <b>" + password + '</b><br><br><a href="http://192.168.100.5" style="background-color: #008CBA; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">Click to Login</a><br><br><br><b>Tanzania Bureau of Standards</b><br>ICT SECTION <br>P. O. BOX 9524<br>Dar Es Salaam<br>Tanzania<br>www.tbs.go.tz.',
        });
    },

    USER_REGISTRATION_Mail(email, fullname) {
        return (mailOptions = {
            from: '"We Group of Company Team" <noreply@tbs.go.tz>',
            to: email,
            subject: "We ACCOUNT REGISTRATION",
            text: "Hey there, it mail from We Group of Company ",
            html: "Hello! <b>" + fullname + " </b><br><br> Your account with the e-mail address: <b><i>" + email + "</i></b> has been successfully registered.<br><br><br><b>Tanzania Bureau of Standards</b><br>ICT SECTION <br>P. O. BOX 9524<br>Dar Es Salaam<br>Tanzania<br>www.tbs.go.tz.",
        });
    },

    PASSWORD_RESET_Mail(email, fullname, password) {
        return (mailOptions = {
            from: 'We Group of Company Team" <noreply@tbs.go.tz>',
            to: email,
            subject: "We PASSWORD RESET",
            text: "Hey there, it mail from We Group of Company ",
            html: "Hello! <b>" + fullname + " </b><br><br> Your password associated with the e-mail address: <b><i>" + email + "</i></b> has been reseted.<br><br>Please click the button below to login.<br><br>Initial password: <b>" + password + '</b><br><br><a href="http://192.168.100.5" style="background-color: #008CBA; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">Click to Login</a><br><br><br><b>Tanzania Bureau of Standards</b><br>ICT SECTION <br>P. O. BOX 9524<br>Dar Es Salaam<br>Tanzania<br>www.tbs.go.tz.',
        });
    },



};