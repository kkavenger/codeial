const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./enviroment');

let transporter = nodemailer.createTransport(env.smtp);

let renderTemplate = (data,relative) => {
    let mainHtml;
    ejs.renderFile(
        path.join(__dirname, '../views/mailer',relative),
        data,
        function (err,template){
            if(err){
                console.log('Error rendering template');
                return;
            }
            mainHtml = template;
        }
    )
    return mainHtml;
}
module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}