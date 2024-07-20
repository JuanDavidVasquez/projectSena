import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {

    const { email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    //Informacion del email

    const inf = await transport.sendMail({
        from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to:    email,
        subject: "UpTask . Comprueba tu cuenta",
        text: "Comprueba tu cuenta en UpTask",
        html: `
            <p>Hola ${nombre} Comprueba tu cuenta en UpTask</p>
            <p>Tu cuenta ya casi esta lista, solo debes comprobar en el siguiente enlace</p>
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>

            <p>Si tu no create esta cuenta, puedes ignorar el mensaje</p>
        `,
    })
};

export const emailOlvidePassword = async (datos) => {

    const { email, nombre, token } = datos;

    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
      });

    //Informacion del email

    const inf = await transport.sendMail({
        from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to:    email,
        subject: "UpTask - Reestablece tu Password",
        text: "Comprueba tu cuenta en UpTask",
        html: `
            <p>Hola ${nombre}, has solicitado reestablecer tu password de UpTask</p>
            <p>El siguiente enlace genera un nuevo password:</p>
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Comprobar Cuenta</a>

            <p>Si tu no create esta cuenta, puedes ignorar el mensaje</p>
        `,
    })
};