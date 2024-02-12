import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from 'react';
import { getBooks } from '../api/books';

type Pagination = {
    hasNext: boolean;
    hasPrevious: boolean;
    page: number;
    pages: number;
    total: number;
};

export type Book = {
    _id: string;
    title: string;
    genres: string[];
    cover: {
        url: string;
    };
    status: string;
};

type BookContextType = {
    books: Book[] | null;
    currentPage: number;
    pagination: Pagination | null;
    fetchBooks: (page: number, limit?: number) => void;
    setCurrentPage: Dispatch<SetStateAction<number>>;
};

export const BookContext = createContext<BookContextType | undefined>(
    undefined
);

type BookContextProviderType = {
    children: ReactNode;
};

export const BookContextProvider = ({ children }: BookContextProviderType) => {
    const [books, setBooks] = useState<Book[] | null>(null);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const fetchBooks = async (page: number, limit?: number) => {
        const response = await getBooks(page, limit);
        if ('error' in response) {
            console.log(response.error);
        } else {
            setBooks(response.data.books);
            const { hasNext, hasPrevious, page, pages, total } = response.data;
            setPagination({ hasNext, hasPrevious, page, pages, total });
        }
    };

    return (
        <BookContext.Provider
            value={{
                books,
                currentPage,
                pagination,
                fetchBooks,
                setCurrentPage,
            }}
        >
            {children}
        </BookContext.Provider>
    );
};
