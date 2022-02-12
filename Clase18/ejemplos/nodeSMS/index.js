const twilio = require('twilio')

const accountSid = 'ACa0c72e60267aa1ea3bb9b6a2731862e7'
const authToken = '49bd315f31cf083f26be486a86911ff1'

const client = twilio(accountSid, authToken)

const options = {
    body: 'Hola soy un SMS desde Node.js!',
    from: '+18507864089',
    to: '+5493534110019'
}

try {
    const send = async() => {
        const message = await client.messages.create(options)
        console.log(message)
    }
    send()
} catch (error) {
    console.log(error)
}
