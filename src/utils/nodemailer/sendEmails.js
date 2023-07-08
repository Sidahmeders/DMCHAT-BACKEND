const nodemailer = require('nodemailer')

const resetEmailTemplate = require('./_resetEmailTemplate')
const confirmLoginTemplate = require('./_confirmLoginTemplate')

/**
 * @param recipients - list OR string of receivers
 * @param subject - the email subject
 * @param directUrl - user generated url
 * @returns {{Promise}}
 */
const sendEmails = async ({ recipients, subject, directUrl, secretKey }) => {
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

    const mailPayload = {
      from: 'Deghmine M.A <sidozoldik@gmail.com>',
      to: recipients,
      subject,
    }

    if (directUrl) {
      await transporter.sendMail({ ...mailPayload, html: resetEmailTemplate({ directUrl }) })
    } else if (secretKey) {
      await transporter.sendMail({ ...mailPayload, html: confirmLoginTemplate({ secretKey }) })
    }
  } catch (error) {
    console.error(`Nodemailer Error: ${error}`)
  }
}

module.exports = sendEmails
