'use strict'

const { ForbiddenError } = require('../core/error.response');
const transport = require('../dbs/init.nodemailer');
const otpModel = require('../models/otp.model');
const templateModel = require('../models/template.model');
const { replacePlaceholder } = require('../utils');
const otpService = require('./otp.service');
const templateService = require('./template.service');

class EmailService {
    sendEmailToken = async ({
        email = null
    }) => {
        try {
            // get token
            const token = otpService.newToken({ email });
            // get template
            const template = await templateService.getTemplate({
                template_name: 'sample 1'
            })
            if (!template) {
                throw new ForbiddenError('not exist template')
            }
            // replace to holder
            console.log(template);
            
            // const content = replacePlaceholder(
            //     template.template_html,
            //     {
            //         link_verify: `http://localhost:3055/cgp/welcome-back?token=${token}`
            //     }
            // )
            // send email
            this.sendEmailLinkVerify({ 
                emailTo: email,
                html: template.template_html,
                subject: 'Vui lòng đăng ký'
            }).catch((err) => {
                console.error(err);
            })

            return 1;
        } catch (error) {
            return error
        }
    }
    async sendEmailLinkVerify({
        html,
        emailTo,
        subject = 'Hello ✔',
        text="Xác nhận"
    }) {
        
        try {
            const options = {
                from: {
                    name: 'GOldz',
                    address: process.env.EMAIL_USER
                },
                to: [emailTo], // list of receivers
                subject: subject, // Subject line
                text: text, // plain text body
                html: html, // html body
            }

            transport.sendMail(options, (err, info) => {
                if (err) {
                    console.error(err);
                }

                console.log('Send success::', info.messageId);
            })
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = new EmailService()