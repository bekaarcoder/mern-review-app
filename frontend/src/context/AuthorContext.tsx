import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useEffect,
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
    fetchAuthors: (page: number, controller: AbortController) => void;
    deleteBook: () => void;
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

    const deleteBook = async () => {
        const controller = new AbortController();
        console.log('Deleting book');
        await fetchAuthors(currentPage, controller);
    };

    const fetchAuthors = async (page: number, controller: AbortController) => {
        const response = await getAuthors(controller, page);
        if ('error' in response) {
            console.log(response.error);
        } else {
            console.log(response.data);
            setAuthors(response.data.authors);
            const { hasNext, hasPrevious, page, pages, total } = response.data;
            setPagination({ hasNext, hasPrevious, page, pages, total });
        }
    };

    useEffect(() => {
        const controller = new AbortController();

        // const fetchAuthors = async (page: number) => {
        //     const response = await getAuthors(controller, page);
        //     if ('error' in response) {
        //         console.log(response.error);
        //     } else {
        //         console.log(response.data);
        //         setAuthors(response.data.authors);
        //         const { hasNext, hasPrevious, page, pages, total } =
        //             response.data;
        //         setPagination({ hasNext, hasPrevious, page, pages, total });
        //     }
        // };

        fetchAuthors(currentPage, controller);

        return () => {
            controller.abort();
        };
    }, [currentPage]);

    return (
        <AuthorContext.Provider
            value={{
                authors,
                currentPage,
                fetchAuthors,
                deleteBook,
                pagination,
                setCurrentPage,
            }}
        >
            {children}
        </AuthorContext.Provider>
    );
};
