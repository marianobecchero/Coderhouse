const { createTransport } = require('nodemailer')

const TEST_MAIL = 'marianobecchero@gmail.com'

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'marianobecchero@gmail.com',
        pass: 'gfkmsjugcshurayo'
    }
});

const mailOptions = {
    from: 'Servidor Node.js',
    to: TEST_MAIL,
    subject: 'Mail de prueba desde Node.js',
    html: '<h1 style="color: blue;">Contenido de prueba con archivo adjunto desde <span style="color: green;">Node.js con Nodemailer</span></h1>',
    attachments: [
        {
            path: './nodemailer.png'
        }
    ]
}

try {
    const send = async() => {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    }
    send()
} catch (error) {
    console.log(error)
}

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;