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

export const addBook = async (bookFormData: FormData): Promise<Response> => {
    try {
        const response = await client.post('/books/create', bookFormData, {
            withCredentials: true,
        });
        return { data: response.data } as SuccessResponse;
    } catch (error) {
        return handleError(error);
    }
};

export const getBook = async (bookId: string): Promise<Response> => {
    try {
        const response = await client.get(`/books/${bookId}`, {
            withCredentials: true,
        });
        return { data: response.data } as SuccessResponse;
    } catch (error) {
        return handleError(error);
    }
};

export interface BookData {
    title: string;
    description: string;
    author: string;
    publishedDate: string;
    status: string;
    type: string;
    genres: string[];
    tags: string[];
    language: string;
}

export const updateBook = async (
    bookFormData: BookData,
    bookId: string
): Promise<Response> => {
    try {
        const response = await client.patch(
            `books/update-book-details/${bookId}`,
            bookFormData,
            {
                withCredentials: true,
            }
        );
        return { data: response.data } as SuccessResponse;
    } catch (error) {
        return handleError(error);
    }
};
