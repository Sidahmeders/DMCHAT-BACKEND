const nodemailer = require('nodemailer')

const htmlTemplate = require('./emailTemplate')

/**
 * @param recipients - list OR string of receivers
 * @param subject - the email subject
 * @param directUrl - user generated url
 * @param formType - this is an object that you can import from this module
 * @returns {{Promise}}
 */
const sendEmails = async ({ recipients, subject, directUrl, formType }) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // send mail with defined transport object
    await transporter.sendMail({
      from: 'Deghmine M.A <sidozoldik@gmail.com>',
      to: recipients,
      subject,
      html: htmlTemplate(directUrl, formType),
    })
  } catch (error) {
    console.error(`Nodemailer Error: ${error}`)
  }
}

const EmailFormTypes = Object.freeze({
  reset: 'reset',
  verify: 'verify',
  updates: 'updates',
})

module.exports = { sendEmails, EmailFormTypes }
