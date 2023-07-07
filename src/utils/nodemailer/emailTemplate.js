// directUrl: the web url for reseting or verifying the user depending on the type
// type: you have to either pass reset OR verify, if you leave the field empty then you will get an error.
// image-url = https://www.linkpicture.com/q/movie-play.png

/**
 *
 * @param {('url_string')} directUrl - the unique generated url of the user
 * @param {('reset' | 'verify' | 'updates')} formType - the request type included in the email body
 * @returns  Always returns string HTML-element.
 */

module.exports = function emailTemplate(directUrl, formType) {
  const validFormTypes = ['reset', 'verify', 'updates']
  if (!validFormTypes.includes(formType)) {
    throw Error(
      `unvalid formType field.
      got: ${formType},
      expected: @params(${validFormTypes.toString().replace(/,/g, ' | ')}) `,
    )
  }

  const formProps = {
    reset: {
      btnStyle: `
        background-color: orange;
      `,
      btnText: 'reset your password',
    },
    verify: {
      btnStyle: `
        background-color: green;
      `,
      btnText: 'verify your account',
    },
  }

  const { btnText, btnStyle } = formProps[formType]

  return `    
    <!doctype html>
    <html lang="en-US">

    <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title>Reset Password Email Template</title>
        <meta name="description" content="Reset Password Email Template.">
        <style type="text/css">
            a:hover {text-decoration: underline !important;}
        </style>
    </head>

    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
        <!--100% body table-->
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
            style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
            <td style="height:80px;">&nbsp;</td>
        </tr>            
        <tr>
            <td style="height:20px;">&nbsp;</td>
        </tr>
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td>
                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                requested to reset your password</h1>
                                            <span
                                                style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                We cannot simply send you your old password. A unique link to reset your
                                                password has been generated for you. To reset your password, click the
                                                following link and follow the instructions.
                                            </p>
                                            <a
                                                target="blank" 
                                                href="${directUrl}"
                                                style="
                                                ${btnStyle}
                                                text-decoration:none !important;
                                                font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase;
                                                font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;"
                                                >
                                                ${btnText}
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">
                                &copy; <strong>Deghmine M.A</strong>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--/100% body table-->

        <footer
            style="
                color: grey;
                text-align: center;
                padding-bottom: 32px;
            "
        >
            This email was sent to&nbsp;you because&nbsp;you
            made&nbsp;the request&nbsp;to ${btnText} &nbsp;
        </footer>
    </body>
    </html>
  `
}
