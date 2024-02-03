import { Author } from './Author';

export interface Book {
    title: string;
    description: string;
    author: Author;
    publishedDate: string;
    status: string;
    type: string;
    genres: string[];
    tags: string[];
    language: string;
}
