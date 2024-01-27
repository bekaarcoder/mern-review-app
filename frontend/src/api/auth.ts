/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, isAxiosError } from 'axios';
import client from './client';

interface SuccessResponse {
    data: any;
}

interface ErrorResponse {
    error: string;
}

type Response = SuccessResponse | ErrorResponse;

const handleError = (error: AxiosError | any): ErrorResponse => {
    if (isAxiosError(error)) {
        console.log(error.message);
        console.log(error.response?.data);
        return error.response
            ? (error.response.data as ErrorResponse)
            : ({ error: error.message } as ErrorResponse);
    } else {
        console.log(error);
        return { error: error } as ErrorResponse;
    }
};

interface SignUpCredentials {
    email: string;
    username: string;
    password: string;
}

export const signUp = async (
    credentials: SignUpCredentials
): Promise<Response> => {
    try {
        const response = await client.post('/auth/signup', credentials);
        return { data: response.data } as SuccessResponse;
    } catch (error) {
        return handleError(error);
    }
};

interface VerifyEmailData {
    userId: string;
    verificationCode: string;
}

export const verifyEmail = async (
    verifyEmailData: VerifyEmailData
): Promise<Response> => {
    try {
        const response = await client.post(
            '/auth/verify-email',
            verifyEmailData
        );
        return { data: response.data } as SuccessResponse;
    } catch (error) {
        return handleError(error);
    }
};

interface SignInCredentials {
    email: string;
    password: string;
}

export const signIn = async (
    credentials: SignInCredentials
): Promise<Response> => {
    try {
        const response = await client.post('/auth/signin', credentials, {
            withCredentials: true,
        });
        return { data: response.data } as SuccessResponse;
    } catch (error) {
        return handleError(error);
    }
};

export const validateToken = async (): Promise<Response> => {
    try {
        const response = await client.get('/auth/validate-token', {
            withCredentials: true,
        });
        return { data: response.data } as SuccessResponse;
    } catch (error) {
        return handleError(error);
    }
};

export const signOut = async (): Promise<Response> => {
    try {
        const response = await client.post(
            '/auth/logout',
            {},
            {
                withCredentials: true,
            }
        );
        return { data: response.data } as SuccessResponse;
    } catch (error) {
        return handleError(error);
    }
};

interface ResetPasswordRequestData {
    emailOrUsername: string;
}

export const requestPasswordReset = async (
    data: ResetPasswordRequestData
): Promise<Response> => {
    try {
        const response = await client.post(
            '/auth/reset-password-request',
            data
        );
        return { data: response.data } as SuccessResponse;
    } catch (error) {
        return handleError(error);
    }
};

interface ResetPasswordData {
    token: string | null;
    userId: string | null;
    newPassword: string;
    confirmPassword: string;
}

export const resetPassword = async (
    data: ResetPasswordData
): Promise<Response> => {
    try {
        const response = await client.post('/auth/reset-password', data);
        return { data: response.data } as SuccessResponse;
    } catch (error) {
        return handleError(error);
    }
};

interface ResendVerificationCodeData {
    userId: string;
}

export const resendVerificationCode = async (
    data: ResendVerificationCodeData
): Promise<Response> => {
    try {
        const response = await client.post(
            '/auth/resend-verification-code',
            data
        );
        return { data: response.data } as SuccessResponse;
    } catch (error) {
        return handleError(error);
    }
};
