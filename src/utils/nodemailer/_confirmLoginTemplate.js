const confirmationTemplate = ({ secretKey }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirm User Login</title>
</head>
<body>
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">Confirmer la connexion de l'utilisateur</h2>
    <p style="color: #555; font-size: 16px; margin-bottom: 10px;">Pour vous connecter en toute sécurité à votre compte, veuillez saisir la clé secrète à 6 chiffres suivante:</p>
    <p style="font-size: 28px; font-weight: bold; margin-bottom: 20px;">${secretKey}</p>
    <p style="color: #777; font-size: 14px; line-height: 1.5;">Si vous n'avez pas initié cette connexion, veuillez contacter immédiatement Deghmine M.A.</p>
  </div>
</body>
</html>
`

module.exports = confirmationTemplate
