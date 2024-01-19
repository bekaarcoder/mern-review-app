import env from '../src/util/validateEnv';

export default {
    smtp: {
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        user: env.MAILTRAP_USER,
        pass: env.MAILTRAP_PASSWORD,
    },
};
