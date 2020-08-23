const express = require('express');
const signup = express.Router();
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const emailConfigs = require('../../configs/emailCredentials.json');

signup.use(cors());
signup.post('/signup',async (req,res) => {

    let fullName = req.body.fullName;
    let emailId = req.body.emailId;

    await sendVerificationEmail(emailId, fullName);

    res.status(200).json({ 
        status: "Success", 
        message: "Verification email sent"
    });

    return true;
});

async function sendVerificationEmail (emailId, fullName) {

    let current_date = (new Date()).valueOf().toString();
    let random = Math.random().toString();
    let hashedValue = crypto.createHash('MD5').update(current_date + random).digest('hex');
    let verificationLink = emailConfigs.verifyEndPointUrl+"?key="+hashedValue;

    //Store this key in your database so that you can verify the email which use this link.
    //Create your own logic here

    let transporter = nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 465,
        secure: true,
        auth: {
           user: "apikey",
           pass:  emailConfigs.sendGridApiKey
        }
    });

    transporter.use('compile',hbs({
        viewEngine: {
           extName: '.handlebars',
           partialsDir: './emailTemplates/',
           layoutsDir: './emailTemplates/',
           defaultLayout: 'emailVerification'
        },
        viewPath: './emailTemplates/',
        extName: '.handlebars'
    }));

    await transporter.sendMail({
        from: emailConfigs.adminEmail,
        to: emailId,
        subject: 'Verify your email address for My App',
        template: 'emailVerification',
        context: {
            appLogoUrl: emailConfigs.appLogoUrl,
            verificationLink: verificationLink,
            name: fullName
        }
    });
}

module.exports = signup;