import { MouseEvent, useCallback, useEffect } from 'react';
import BookList from '../../components/BookList';
import { useBookContext } from '../../hooks/useBookContext';
import Pagination from '../../components/Pagination';

const Books = () => {
    const { currentPage, books, fetchBooks, setCurrentPage, pagination } =
        useBookContext();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoizedFetchBooks = useCallback(fetchBooks, []);

    const handleNext = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setCurrentPage((prev) => prev + 1);
    };

    const handlePrevious = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setCurrentPage((prev) => prev - 1);
    };

    useEffect(() => {
        memoizedFetchBooks(currentPage);
    }, [memoizedFetchBooks, currentPage]);

    return (
        <div className="row">
            <div className="col-md-12">
                <h3>Books</h3>
                {books && <BookList books={books} />}
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

export default Books;
