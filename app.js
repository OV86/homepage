var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', (process.env.PORT || 5000));

app.get("/", function(req, res) {
    res.redirect('/ee');
});

app.get("/ee", function(req, res) {
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
            host: 'smtp.zone.ee',
            port: 587,
            secure: false,
            auth: {
                user: "olaf@devstack.ee", // generated ethereal user
                pass: "oldevstack123" // generated ethereal password
            }
    });

    // setup email data with unicode symbols
    let mailData = req.body;
    console.log(mailData);
    let mailOptions = {
        from: mailData.email, // sender address
        to: 'olaf.vaher@gmail.com', // list of receivers separated by comma
        subject: 'Form submission from Devstack: ' + mailData.email, // Subject line
        text: mailData.message, // plain text body
        html: '<p>From: ' + mailData.name + '</p><p>Email: ' + mailData.email + '</p><p>' + mailData.message + '</p>'
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        res.redirect('/');
    });
});

app.listen(app.get('port'), function() {
    console.log("Server started.");
});