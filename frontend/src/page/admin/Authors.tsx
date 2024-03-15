import { FormEvent, MouseEvent, useState } from 'react';
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

    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleNext = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setCurrentPage((prev) => prev + 1);
    };

    const handlePrevious = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setCurrentPage((prev) => prev - 1);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery !== '') {
            console.log(searchQuery);
        }
    };

    return (
        <div className="row my-4">
            <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="my-3 display-5">Authors</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="search"
                            name="search"
                            className="form-control"
                            placeholder="Search Author"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                </div>
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
