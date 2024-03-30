import { BookData } from '../api/books';
import { Author } from './Author';

export interface Book {
    title: string;
    description: string;
    author: Author;
    publishedDate: string;
    status: string;
    pages: number;
    type: string;
    genres: string[];
    tags: string[];
    language: string;
}

export const formDataToBookData = (formData: FormData): BookData => {
    const bookData: BookData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        author: formData.get('author') as string,
        publishedDate: formData.get('publishedDate') as string,
        status: formData.get('status') as string,
        pages: formData.get('pages') as string,
        type: formData.get('type') as string,
        genres: JSON.parse(formData.get('genres') as string),
        tags: JSON.parse(formData.get('tags') as string),
        language: formData.get('language') as string,
    };
    return bookData;
};
