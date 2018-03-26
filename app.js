const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

let env = process.env.NODE_ENV || 'development';

// set up SSL redirect
const forceSsl = function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
};

if (env !== 'development') {
    app.use(forceSsl);
}

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', (process.env.PORT || 5000));

app.get("/", function(req, res) {
    res.sendFile('est.html', {"root": __dirname});
});

app.get("/en", function(req, res) {
    res.sendFile('eng.html', {"root": __dirname});
});

app.post('/formProcess', function (req, res) {
    const nodemailer = require('nodemailer');

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(
        {
            host: 'smtp.zoho.com',
            port: 587,
            secure: false,
            auth: {
                user: "info@devstack.ee",
                pass: "SloiwramthISwo8"
            }
    });

    // setup email data with unicode symbols
    let mailData = req.body;
    console.log(mailData);
    let mailOptions = {
        from: "info@devstack.ee", // sender address
        to: 'olaf.vaher@gmail.com, trifunovic.stefan@yahoo.com', // list of receivers separated by comma
        subject: 'Devstack form submission: ' + mailData.email, // Subject line
        text: mailData.message, // plain text body
        html: '<p>Name: ' + mailData.name + '</p><p>Email: ' + mailData.email + '</p><p>' + mailData.message + '</p>'
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.redirect('/');
            return;
        }
        console.log('Message sent: %s', info.messageId);
        res.redirect('/');
    });
});

app.listen(app.get('port'), function() {
    console.log("Server started.");
});