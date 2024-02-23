import { MouseEvent } from 'react';
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
    const { authors, pagination, setCurrentPage } = useAuthorContext();

    const handleNext = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setCurrentPage((prev) => prev + 1);
    };

    const handlePrevious = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setCurrentPage((prev) => prev - 1);
    };

    return (
        <div className="row my-4">
            <div className="col-md-12">
                <h3 className="my-3 display-5">Authors</h3>
                {authors && <AuthorList authors={authors} />}
                {pagination && (
                    <Pagination
                        hasNext={pagination.hasNext}
                        hasPrevious={pagination.hasPrevious}
                        currentPage={pagination.page}
                        totalPage={pagination.pages}
                        handleNext={handleNext}
                        handlePrevious={handlePrevious}
                    />
                )}
            </div>
        </div>
    );
};

export default Authors;
