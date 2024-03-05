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
    id: string;
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

export interface ReviewedBook {
    id: string;
    title: string;
    cover: string;
    averageRating: string;
}

class BookService {
    getBook(bookId: string) {
        const controller = new AbortController();
        const request = client.get<Book>(`/books/${bookId}`, {
            signal: controller.signal,
        });
        return { request, cancel: () => controller.abort() };
    }

    getLatestBooks() {
        const controller = new AbortController();
        const request = client.get<Book[]>(`/books/latest`, {
            signal: controller.signal,
        });
        return { request, cancel: () => controller.abort() };
    }

    getTopReviewedBooks() {
        const controller = new AbortController();
        const request = client.get<ReviewedBook[]>('/books/top-rated', {
            signal: controller.signal,
        });
        return { request, cancel: () => controller.abort() };
    }
}

export default new BookService();
