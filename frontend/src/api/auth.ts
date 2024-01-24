import { isAxiosError } from 'axios';
import client from './client';

interface SignUpCredentials {
    email: string;
    username: string;
    password: string;
}

interface SuccessResponse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}

interface ErrorResponse {
    error: string;
}

type Response = SuccessResponse | ErrorResponse;

export const signUp = async (
    credentials: SignUpCredentials
): Promise<Response> => {
    try {
        const response = await client.post('/auth/signup', credentials);
        return { data: response.data } as SuccessResponse;
    } catch (error) {
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
    }
};

export const validateToken = async (): Promise<Response> => {
    try {
        const response = await client.get('/auth/validate-token', {
            withCredentials: true,
        });
        return { data: response.data } as SuccessResponse;
    } catch (error) {
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
    }
};
