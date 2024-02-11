import { MouseEvent, useEffect } from 'react';
import AuthorList from '../../components/AuthorList';
import Pagination from '../../components/Pagination';
import { useAuthorContext } from '../../hooks/useAuthorContext';

type Pagination = {
    hasNext: boolean;
    hasPrevious: boolean;
    page: number;
    pages: number;
    total: number;
};

const Authors = () => {
    const { authors, pagination, currentPage, setCurrentPage, fetchAuthors } =
        useAuthorContext();

    const handleNext = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setCurrentPage((prev) => prev + 1);
    };

    const handlePrevious = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setCurrentPage((prev) => prev - 1);
    };

    useEffect(() => {
        fetchAuthors(currentPage);
    }, [fetchAuthors, currentPage]);

    return (
        <div className="row">
            <div className="col-md-12">
                <h3>Authors</h3>
                {authors && <AuthorList authors={authors} />}
                {pagination && (
                    <Pagination
                        hasNext={pagination.hasNext}
                        hasPrevious={pagination.hasPrevious}
                        handleNext={handleNext}
                        handlePrevious={handlePrevious}
                    />
                )}
            </div>
        </div>
    );
};

export default Authors;
