import client from '../api/client';

export interface PhotoUrl {
    url: string;
}

export interface Author {
    _id: string;
    name: string;
    about: string;
    avatar: PhotoUrl | null;
}

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
    cover: PhotoUrl;
    averageRating: string;
    reviewCount: number;
    reviews: string[];
}

class BookService {
    getBook(bookId: string) {
        const controller = new AbortController();
        const request = client.get<Book>(`/books/${bookId}`, {
            signal: controller.signal,
        });
        return { request, cancel: () => controller.abort() };
    }
}

export default new BookService();
