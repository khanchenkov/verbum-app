require('dotenv').config();
const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD
            },
            from: process.env.SMTP_EMAIL
        })
    }
    async sendActivationMail(to, link, url) {
        await this.transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to,
            subject: `Account activation ${url}`,
            text: "",
            html:
                `
                <div>
                    <h1>To activate, click the link below:</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
    async sendResetMail(to, link, url) {
        await this.transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to,
            subject: `Restoring access to your account ${url}`,
            text: "",
            html:
                `
                <div>
                    <h1>To reset your password, click the link below:</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}

module.exports = new MailService();