export interface EmailTemplateProps {
  title: string;
  content: string;
}

export function getEmailTemplate({ title, content }: EmailTemplateProps): string {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return `
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title}</title>
  <!--[if mso]>
  <style>
    table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}
    div, td {padding:0;}
    div {margin:0 !important;}
  </style>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    @media screen and (max-width: 600px) {
      .mobile-padding { padding: 20px !important; }
      .mobile-font { font-size: 16px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;word-spacing:normal;background-color:#f5f5f5;">
  <div role="article" aria-roledescription="email" lang="en" style="background-color:#f5f5f5;">
    
    <!-- Wrapper Table -->
    <table role="presentation" style="width:100%;border:none;border-spacing:0;">
      <tr>
        <td align="center" style="padding:40px 0;">
          
          <!-- Main Container -->
          <table role="presentation" style="width:600px;max-width:600px;border:none;border-spacing:0;background:#ffffff;border-radius:8px;overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="padding:40px 40px 30px 40px;">
                <table role="presentation" style="width:100%;border:none;border-spacing:0;">
                  <tr>
                    <td align="center" style="position:relative;">
                      <img src="https://res.cloudinary.com/dxd79mrse/image/upload/v1772161578/Idyll_Productions_Black_ty3r3d.png" 
                           alt="Idyll Productions" 
                           width="120" 
                           style="display:block;width:auto;height:80px;max-width:200px;border:0;margin:0 auto;">
                    </td>
                  </tr>
                  <tr>
                    <td align="right" style="padding-top:10px;">
                      <p style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:13px;color:#999999;text-align:right;">
                        ${currentDate}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!-- Title -->
            <tr>
              <td style="padding:0 40px 24px 40px;border-left:4px solid #ff6b35;">
                <h2 style="margin:0;padding:0 0 0 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:28px;font-weight:700;color:#1a1a1a;line-height:1.3;letter-spacing:-0.5px;">
                  ${title}
                </h2>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding:0 40px 32px 40px;">
                <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:16px;line-height:1.6;color:#4a4a4a;">
${content.split('\n').map(line => line.trim()).filter(line => line).map(line => `                  <p style="margin:0 0 16px 0;">${line}</p>`).join('\n')}
                </div>
              </td>
            </tr>
            
            <!-- Button -->
            <tr>
              <td style="padding:0 40px 40px 40px;">
                <table role="presentation" style="border:none;border-spacing:0;">
                  <tr>
                    <td>
                      <a href="https://idyllproductions.com/" 
                         style="display:inline-block;padding:14px 32px;background:#ff6b35;color:#ffffff;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">
                        CONTACT US
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="padding:30px 40px;background:linear-gradient(135deg, #fff5f0 0%, #ffe8dc 100%);border-top:3px solid #ff6b35;">
                <table role="presentation" style="width:100%;border:none;border-spacing:0;">
                  <tr>
                    <td align="center">
                      <table role="presentation" style="border:none;border-spacing:0;margin:0 auto;">
                        <tr>
                          <td style="padding-right:8px;vertical-align:middle;">
                            <img src="https://img.icons8.com/fluency/48/security-checked.png" 
                                 alt="Secure" 
                                 width="18" 
                                 height="18" 
                                 style="display:block;border:0;">
                          </td>
                          <td style="vertical-align:middle;">
                            <p style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:13px;color:#666666;line-height:1.5;">
                              This email was generated by the Idyll Productions Workspace
                            </p>
                          </td>
                        </tr>
                      </table>
                      <p style="margin:12px 0 0 0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:12px;color:#999999;line-height:1.5;">
                        © 2026 Idyll Productions Email System. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
          </table>
          
        </td>
      </tr>
    </table>
    
  </div>
</body>
</html>
  `.trim();
}
