import config from 'config';
import nodemailer, { SendMailOptions } from 'nodemailer';

const smtp = config.get<{
    host: string;
    port: number;
    user: string;
    pass: string;
}>('smtp');

const transport = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    auth: {
        user: smtp.user,
        pass: smtp.pass,
    },
});

async function sendMail(payload: SendMailOptions) {
    transport.sendMail(payload, (err, info) => {
        if (err) {
            console.log('Error sending email', err);
            return;
        }
        console.log('email sent', info);
    });
}

export default sendMail;
