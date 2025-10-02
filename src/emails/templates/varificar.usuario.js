const cantidadHorasExpirationRegister = process.env.CANT_HORAS_EXPIRATION_REGISTER || 24;

export const verificarUsuarioTemplate = ({ nombre, url }) => `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
  </head>
  <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%); min-height: 100vh;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="min-height: 100vh;">
      <tr>
        <td style="padding: 40px 20px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 420px; margin: 0 auto;">
            <tr>
              <td style="background: #ffffff; border-radius: 18px; box-shadow: 0 4px 24px rgba(0,0,0,0.10), 0 1.5px 4px rgba(0,0,0,0.08); padding: 40px 32px;">
                
                <!-- Título -->
                <h2 style="margin: 0 0 24px 0; padding: 0; color: #0076d7; font-size: 28px; font-weight: 600; text-align: center; line-height: 1.3;">
                  ¡Bienvenido, ${nombre}!
                </h2>
                
                <!-- Texto principal -->
                <p style="margin: 0 0 28px 0; padding: 0; color: #333333; font-size: 16px; line-height: 1.6; text-align: center;">
                  Para activar tu cuenta del servicio de "<strong style="color: #0076d7;">${process.env.EMPRESA_NOMBRE}</strong>", hacé clic en el siguiente botón:
                </p>
                
                <!-- Botón -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 28px 0;">
                  <tr>
                    <td style="text-align: center;">
                      <a href="${url}" style="display: inline-block; background-color: #0076d7; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; text-align: center; transition: background-color 0.3s ease;">
                        Verificar email
                      </a>
                    </td>
                  </tr>
                </table>
                
                <!-- Nota de expiración -->
                <p style="margin: 0; padding: 0; color: #6c757d; font-size: 15px; line-height: 1.5; text-align: center;">
                  Este enlace expira en <strong style="color: #333333;">${cantidadHorasExpirationRegister}</strong> horas.
                </p>
                
                <!-- Separador -->
                <hr style="margin: 28px 0; border: none; border-top: 1px solid #e9ecef;">
                
                <!-- Texto alternativo -->
                <p style="margin: 0; padding: 0; color: #6c757d; font-size: 13px; line-height: 1.5; text-align: center;">
                  Si no podés hacer clic en el botón, copiá y pegá este enlace en tu navegador:
                </p>
                <p style="margin: 8px 0 0 0; padding: 0; color: #0076d7; font-size: 12px; line-height: 1.5; text-align: center; word-break: break-all;">
                  <a href="${url}" style="color: #0076d7; text-decoration: none;">${url}</a>
                </p>
                
              </td>
            </tr>
          </table>
          
          <!-- Footer -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 420px; margin: 20px auto 0;">
            <tr>
              <td style="text-align: center; color: #6c757d; font-size: 13px; line-height: 1.5;">
                <p style="margin: 0; padding: 0;">
                  Este es un email automático, por favor no respondas a este mensaje.
                </p>
              </td>
            </tr>
          </table>
          
        </td>
      </tr>
    </table>
  </body>
</html>
`;