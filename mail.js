const nodemailer = require("nodemailer");
const Transport = require("nodemailer-sendinblue-transport");

const transporter = nodemailer.createTransport(
    new Transport({
        apiKey: process.env.SENDINBLUE_API_KEY
    })
);

async function sendMail(email) {
    const info = await transporter.sendMail({
        from: process.env.SENDINBLUE_MAIL_ADDR,
        to: email,
        subject: "Experiment Report - Please check report details",
        text: `The following is your experiment report,
        
            Epochs: ${2 + Math.floor(Math.random() * 3)}
            F1 Score: ${0.5 + Math.random() * 0.2}
            Time: ${new Date().toUTCString()}`,
    });
    console.log(info.messageId);
    return info.messageId;
}

module.exports.sendMail = sendMail;