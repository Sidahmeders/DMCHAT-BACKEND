const nodemailer = require('nodemailer')

const resetEmailTemplate = require('./_resetEmailTemplate')

/**
 * @param recipients - list OR string of receivers
 * @param subject - the email subject
 * @param directUrl - user generated url
 * @returns {{Promise}}
 */
const sendEmails = async ({ recipients, subject, directUrl }) => {
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
      html: resetEmailTemplate({ directUrl }),
    })
  } catch (error) {
    console.error(`Nodemailer Error: ${error}`)
  }
}

module.exports = sendEmails
