var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile('index.html');
});

app.post('/formProcess', function (req, res) {
    const nodemailer = require('nodemailer');

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(
        {
            service: 'Gmail',
            auth: {
                user: "olaf.hekk@gmail.com", // generated ethereal user
                pass: "l0detfsa" // generated ethereal password
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

app.listen(8080, '127.0.0.1', function() {
    console.log("Server Started.");
});