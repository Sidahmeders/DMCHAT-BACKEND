const confirmationTemplate = ({ userName, email, confirmURL, declineURL }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Confirmation Email</title>
</head>
<body>
  <h1>Confirmation Request</h1>
  <p>Someone with a Name of: ${userName} and Email: ${email} is requesting access to your system</p>
    
  <p>Please click the appropriate button below to confirm or decline thier registration:</p>
  <div style="text-align: center;">
    <a href="${confirmURL}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-right: 10px;">Confirm</a>
    <a href="${declineURL}" style="display: inline-block; background-color: #FF5722; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Decline</a>
  </div>
</body>
</html>
`

module.exports = { confirmationTemplate }
