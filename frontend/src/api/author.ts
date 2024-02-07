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

export const getAuthors = async (pageNumber?: number): Promise<Response> => {
    try {
        const queryParams = new URLSearchParams();
        queryParams.append('pageNo', pageNumber?.toString() || '');
        const response = await client.get(
            `/authors?${queryParams.toString()}`,
            {
                withCredentials: true,
            }
        );
        return { data: response.data } as SuccessResponse;
    } catch (error) {
        return handleError(error);
    }
};

export const getAuthor = async (authorID: string): Promise<Response> => {
    try {
        const response = await client.get(`/authors/${authorID}`, {
            withCredentials: true,
        });
        return { data: response.data } as SuccessResponse;
    } catch (error) {
        return handleError(error);
    }
};

type SearchParams = {
    name: string;
};

export const searchAuthor = async (
    searchParams: SearchParams
): Promise<Response> => {
    try {
        const queryParams = new URLSearchParams();
        queryParams.append('name', searchParams.name || '');

        const response = await client.get(
            `/authors/search?${queryParams.toString()}`,
            {
                withCredentials: true,
            }
        );
        return { data: response.data } as SuccessResponse;
    } catch (error) {
        return handleError(error);
    }
};

export const addAuthor = async (
    authorFormData: FormData
): Promise<Response> => {
    try {
        const response = await client.post('/authors/create', authorFormData, {
            withCredentials: true,
        });
        return { data: response.data } as SuccessResponse;
    } catch (error) {
        return handleError(error);
    }
};

export const updateAuthor = async (
    authorFormData: FormData,
    authorId: string
) => {
    try {
        const response = await client.put(
            `/authors/update/${authorId}`,
            authorFormData,
            {
                withCredentials: true,
            }
        );
        return { data: response.data } as SuccessResponse;
    } catch (error) {
        return handleError(error);
    }
};
