
// import { v4 as uuidv4 } from 'uuid';
import { transporter } from '../config/mail/nodemailer.config.js';
import { devLogger } from '../config/logger/logger.config.js';
import { v4 as uuidv4 } from 'uuid';
import { comparePasswords, createHash } from '../utils/bcrypt.js';
import { empleadoService, oficinaService } from '../services/service.js';

const frontEndUrl = process.env.MAILING_BASE_URL;

export async function sendPDFviaMail(req, res, pdfBuffer) {
  let email;
  const { userId = null, oficinaId = null, equipoId = null } = req.query;
  if(userId){
    const user = await empleadoService.findById(userId, 'conOficina');
    email = user.dataValues.email;
  } else if (oficinaId) {
    const oficina = await oficinaService.findById(oficinaId);
    email = oficina.dataValues.email
  }
  const html =
    `<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #0066cc;">Remito de Entrega de Equipo Informático</h1>
    
    <p style="margin-bottom: 15px;">Estimado/a,</p>
    
    <p style="margin-bottom: 15px;">Por medio del presente, confirmamos y adjuntamos el recibo del material otorgado para su uso exclusivo y excluyente en sus actividades laborales:</p>    
    <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">
    
    <p style="font-size: 12px; color: #666;">Este documento es un remito oficial del MINISTERIO DE TRANSPORTE de la Provincia de Buenos Aires, enviado desde el sistema de InventarioMT. Por favor, conserve una copia para sus registros.</p>
    </body>
    `
  try {
    if (html !== "") {
      const result = await transporter.sendMail({
        from: 'inventarioMT@transporte.gba.gob.ar',
        to: email,
        // cc: "soporte@transporte.gba.gob.ar, laoficina@transporte.gba.gob.ar", 
        subject: 'Adjunto: Asignacion de equipo',
        html: html,
        attachments: [
          {
            filename: 'asignacion-de-equipo.pdf',
            content: pdfBuffer, // El buffer generado por PDFKit
            contentType: 'application/pdf',
          },
        ],
      });
      return res.sendSuccess(result.messageId)
    }
    return res.sendInternalServerError("empty message not allowed")

  } catch (error) {
    devLogger.error(error);
    return res.sendInternalServerError(error);
  }
}

// export async function sendContactMail(req, res) {
//   const userEmail = req.user.email;
//   const { html, attachments } = req.body;
//   const endMssg = '<br><hr><p>Este mensaje fue enviado desde el sistema de Actas-Web, a traves del formulario de contacto</p>';
//   try {
//     if (html !== "") {
//       const result = await transporter.sendMail({
//         from: userEmail,
//         to: 'soporte@transporte.gba.gob.ar',
//         subject: 'Contacto de ayuda - ActasWeb',
//         html: html + endMssg,
//         attachments: attachments
//       });
//       return res.sendSuccess(result.messageId)
//     }
//     return res.sendInternalServerError("empty message not allowed")

//   } catch (error) {
//     devLogger.error(error);
//     return res.sendInternalServerError(error);
//   }
// };

// export async function registerMail(req, res) {
//   const userEmail = req.user.email;
//   const { rol, nombre, apellido, dni } = req.body;
//   const confirmLink = `${frontEndUrl}/acept-user?rol=${rol}&nombre=${nombre}&apellido=${apellido}&dni=${dni}`;
//   const rejectLink = `${frontEndUrl}/acept-user?nombre=rechazado&requester=${userEmail}`;
//   const html =
//     `
//     <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
//       <p>Se pide confirmar y proceder con el alta de usuario para el inspector <span style="font-weight: bold; color: #0066cc;">${nombre}, ${apellido}</span>, con DNI: <span style="background-color: #ffffcc; padding: 2px 4px; border-radius: 3px;">${dni}</span> como <span style="font-weight: bold; color: #0066cc;">${rol}</span> para el sistema.</p>
//       <p>Si es correcta esta información y el empleado existe en los registros, por favor confirmar agregando su mail institucional <span style="font-weight: bold; color: #0066cc;">(@transporte.gba.gob.ar)</span> en el siguiente enlace:</p>    
//       <p><a href="${confirmLink}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; background-color: #0066cc; color: white; text-decoration: none; border-radius: 5px;">Confirmar registro de usuario</a></p>    
//       <p style="color: #cc0000; font-style: italic;">En caso que este no figure dado de alta, por favor informarlo haciendo click en el siguiente enlace:</p>
//       <p><a href="${rejectLink}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; background-color: #0066cc; color: white; text-decoration: none; border-radius: 5px;">Rechazar alta de nuevo usuario</a></p>
//       <p style="color: #cc0000; font-style: italic;">hasta que se regularice. (Esto será informado a quien lo solicitó)</p>
//       <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">    
//       <p>Alta pedida por el usuario <span style="font-weight: bold; color: #0066cc;">${req.user.nombre}, ${req.user.apellido}</span>, con el rol de <span style="background-color: #ffffcc; padding: 2px 4px; border-radius: 3px;">${req.user.rol}</span> validado con acceso controlado.</p>
//     </div>
//     `;
//   const endMssg = '<br><hr><p>Este mensaje fue enviado desde el sistema de  Actas-Web a traves del formulario de registro, para la creacion de un nuevo usuario</p>';
//   try {
//     if (nombre !== "") {
//       const result = await transporter.sendMail({
//         from: userEmail,
//         to: 'soporte@transporte.gba.gob.ar',
//         subject: 'IMPORTANTE: Alta de un nuevo usuario',
//         html: html + endMssg
//       });
//       return res.sendSuccess(result.messageId)
//     }
//     return res.sendInternalServerError("empty message not allowed")
//   } catch (error) {
//     devLogger.error(error);
//     return res.sendInternalServerError(error);
//   }
// };

// export const sendPassword = async (req, res) => {
//   const { email, rol, nombre, apellido, dni, username } = req.query;
//   try {
//     const newUser = await User.findOrCreate({
//       where: { username: username }, defaults: {
//         password: 'MT-123456', email: email, rol: rol, nombre: nombre, apellido: apellido, dni: dni
//       }
//     });
//     if (newUser) {
//       const setPasswordLink = `${frontEndUrl}/reset-password?&uid=${newUser[0].dataValues.id}&state=new`;
//       const endMssg = '<br><hr><p>Este mensaje fue enviado desde el sistema de  Actas-Web a traves del formulario de registro, para la creacion de un nuevo usuario</p>';
//       const html =
//         ` 
//        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
//           <h2 style="color: #0066cc; text-align: center;">Nueva Cuenta Creada</h2>
//           <p>Estimado/a <span style="font-weight: bold; color: #0066cc;">${nombre, apellido}</span>,</p>
//           <p>Nos complace informarle que se ha creado una nueva cuenta para usted en nuestro sistema. Para completar el proceso de registro y comenzar a utilizar su cuenta, es necesario que establezca su contraseña.</p>
//           <p>Tu nombre de usuario para ingresar al sistema es :<strong>${username}</strong>.</p>
//           <p>Por favor, haga clic en el siguiente enlace para establecer su contraseña:</p>
//           <p style="text-align: center;">
//               <a href="${setPasswordLink}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; background-color: #0066cc; color: white; text-decoration: none; border-radius: 5px;">Establecer Contraseña</a>
//           </p>
          
//           <p>Si usted no solicitó esta cuenta o cree que esto es un error, por favor ignore este correo electrónico o contacte a nuestro equipo de soporte.</p>
//           <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
//       </div>     
//       `;

//       const result = await transporter.sendMail({
//         from: 'ActasWeb@transporte.gba.gob.ar',
//         to: email,
//         subject: 'IMPORTANTE: Confirmacion de cuenta de nuevo usuario',
//         html: html + endMssg
//       });
//       return res.sendSuccess(result.messageId)

//     }
//     return res.sendInternalServerError("Error al querer crear el nuevo usuario, verifique")

//   } catch (error) {
//     devLogger.error(error);
//     return res.sendInternalServerError(error);
//   }
// }

// export const sendForgotMail = async (req, res) => {
//   try {
//     const user = await userService.getUserByEmailORusername(req.body.some);
//     if (user) {
//       const resetToken = uuidv4()
//       const resetTokenExpiration = Date.now() + 20 * 60 * 1000;
//       const resetLink = `${frontEndUrl}/reset-password?&uid=${user.id}`;
//       const updatedUser = await userService.updateUser(user.id, { token: resetToken, tokenExpiration: resetTokenExpiration });

//       if (updatedUser) {
//         const result = await transporter.sendMail({
//           from: 'no-responder@transporte.gba.gob.ar',
//           to: user.email,
//           subject: 'Restablece tu contraseña',
//           html: `
//               <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
//                 <div style="background-color: #ffffff; border: 1px solid #e0e0e0; padding: 20px;">
//                     <h1 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Restablecimiento de Contraseña</h1>
//                     <div style="border-bottom: 1px solid #e0e0e0; padding-bottom: 20px; margin-bottom: 20px;">
//                         <p>Hola, <strong>${user.username}</strong>!</p>
//                         <p>Has solicitado restablecer tu contraseña del sistema de ActasWeb.</p>
//                         <p>Haz clic en el siguiente botón para restablecerla. Recuerda que el enlace vence en 20 minutos:</p>
//                         <a href="${resetLink}" style="display: inline-block; background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 3px; margin-top: 15px;">Restablecer Contraseña</a>
//                     </div>
//                     <div style="font-size: 0.9em; color: #7f8c8d; border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 20px;">
//                         <p>Si no solicitaste este cambio, puedes ignorar este correo electrónico.</p>
//                         <p>Este es un mensaje automático, por favor no respondas a este correo.</p>
//                     </div>
//                 </div>
//             </body>
//               `
//         });
//         return res.sendSuccess(result.response);
//       }
//     }
//     return res.sendInternalServerError("Usuario no encontrado, corrige o contacta a soporte")
//   } catch (error) {
//     devLogger.error('Error al enviar el correo de restablecimiento de contraseña:', error);
//     return res.sendInternalServerError(error);
//   }
// };

// export const resetPasswrod = async (req, res) => {
//   const uid = req.query.uid;
//   const { newPassword, state } = req.body;
//   if (!state) {
//     const { password, token, tokenExpiration } = await userService.getUserById(uid);
//     if (!token || tokenExpiration < Date.now()) {
//       if (tokenExpiration < Date.now()) {
//         // res.render('reresetpassword');
//       }
//       return res.sendInternalServerError('Token inválido');
//     }
//     const match = comparePasswords(newPassword, password);
//     if (match) {
//       return res.status(401).send('La contraseña no puede ser igual a la anterior');
//     }
//   }
//   const hashedPassword = createHash(newPassword);
//   await userService.updateUser(uid, { password: hashedPassword, token: null, tokenExpiration: null });
//   res.send('Contraseña restablecida correctamente');
// };

// export const sendReject = async (req, res) => {
//   const { requester } = req.query;
//   const html = `
//   <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
//     <div style="background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px; padding: 20px;">
//         <h2 style="color: #2c3e50; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">Solicitud de Usuario Rechazada</h2>
//         <p>Estimado/a </p>
//         <p>Lamentamos informarle que su solicitud para crear un nuevo usuario ha sido rechazada.</p>
//         <p>Es posible que el usuario ya exista en nuestro sistema o que no esté registrado formalmente. Para resolver esta situación y obtener más información, le rogamos que se ponga en contacto con nuestro equipo de soporte.</p>
//         <p>Si tiene alguna pregunta o necesita asistencia adicional, no dude en comunicarse con nosotros.</p>
//         <p style="margin-top: 20px;">Atentamente,<br>El equipo de ActasWeb</p>
//     </div>
//   </body>`;
//   const endMssg = '<br><hr><p>Este mensaje fue enviado desde el sistema de Actas-Web, a traves del formulario de contacto</p>';
//   try {
//     if (html !== "") {
//       const result = await transporter.sendMail({
//         from: 'ActasWeb@transporte.gba.gob.ar',
//         to: requester,
//         subject: 'Contacto de ayuda - ActasWeb',
//         html: html + endMssg,
//       });
//       return res.sendSuccess(result.messageId)
//     }
//     return res.sendInternalServerError("empty message not allowed")

//   } catch (error) {
//     devLogger.error(error);
//     return res.sendInternalServerError(error);
//   }
// }