import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from 'react';
import { getAuthors } from '../api/author';
import { Author } from '../models/Author';

type Pagination = {
    hasNext: boolean;
    hasPrevious: boolean;
    page: number;
    pages: number;
    total: number;
};

type AuthorContextType = {
    authors: Author[] | null;
    currentPage: number;
    pagination: Pagination | null;
    fetchAuthors: (page: number) => void;
    setCurrentPage: Dispatch<SetStateAction<number>>;
};

export const AuthorContext = createContext<AuthorContextType | undefined>(
    undefined
);

type AuthorContextProviderType = {
    children: ReactNode;
};

export const AuthorContextProvider = ({
    children,
}: AuthorContextProviderType) => {
    const [authors, setAuthors] = useState<Author[] | null>(null);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const fetchAuthors = async (page: number) => {
        const response = await getAuthors(page);
        if ('error' in response) {
            console.log(response.error);
        } else {
            setAuthors(response.data.authors);
            const { hasNext, hasPrevious, page, pages, total } = response.data;
            setPagination({ hasNext, hasPrevious, page, pages, total });
        }
    };

    return (
        <AuthorContext.Provider
            value={{
                authors,
                currentPage,
                fetchAuthors,
                pagination,
                setCurrentPage,
            }}
        >
            {children}
        </AuthorContext.Provider>
    );
};
