export const generateVerificationCode = (): number => {
    const OTP = Math.floor(Math.random() * 900000 + 100000);
    return OTP;
};
