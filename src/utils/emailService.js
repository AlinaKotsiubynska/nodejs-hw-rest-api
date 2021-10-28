const { sgMail } = require('@configs/email.configs')

const email = 'alina.fe.2021@gmail.com'

const onRegistration = ({ to, verifyToken }) => {
  msg = {
    to: to,
    from: email,
    subject: 'Contacts service user verification',
    html: `<h1>Welcome to Contacts service!</h1><p>Please, click the <a href='http://localhost:8080/api/users/verify/${verifyToken}'>link</a> to verify our account</p>`
  }
  sgMail.send(msg)
}

const sendEmail = {
  onRegistration
}

module.exports = {
  sendEmail
}