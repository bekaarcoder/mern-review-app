import { MouseEvent, useEffect, useState } from 'react';
import { getAuthors } from '../../api/author';
import { Author } from '../../models/Author';
import { useAppContext } from '../../hooks/useAppContext';
import dummy from '../../assets/dummy.jpg';

type Pagination = {
    hasNext: boolean;
    hasPrevious: boolean;
    page: number;
    pages: number;
    total: number;
};

const Authors = () => {
    const { showToast } = useAppContext();
    const [authors, setAuthors] = useState<Author[] | null>([]);
    const [pagination, setPagination] = useState<Pagination | null>();
    const [currentPage, setCurrentPage] = useState<number>(0);

    const handleNext = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setCurrentPage((prev) => prev + 1);
    };

    const handlePrevious = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setCurrentPage((prev) => prev - 1);
    };

    useEffect(() => {
        const fetchAuthors = async () => {
            const response = await getAuthors(currentPage);
            if ('error' in response) {
                console.log(response.error);
                showToast({ message: response.error, type: 'ERROR' });
            } else {
                console.log(response.data);
                setAuthors(response.data.authors);
                const { hasNext, hasPrevious, page, pages, total } =
                    response.data;
                setPagination({ hasNext, hasPrevious, page, pages, total });
            }
        };

        fetchAuthors();
    }, [showToast, currentPage]);

    return (
        <div className="row">
            <div className="col-md-12">
                <h3>Authors</h3>
                <div className="row">
                    {authors?.map((author) => (
                        <div
                            className="col-sm-12 col-md-6 col-lg-4"
                            key={author._id}
                        >
                            <div className="card mb-3">
                                <div className="row">
                                    <div className="col-4">
                                        <img
                                            src={
                                                author.avatar
                                                    ? author.avatar.url
                                                    : dummy
                                            }
                                            alt="image"
                                            className="img-fluid rounded-start object-fit-cover"
                                        />
                                    </div>
                                    <div className="col-8">
                                        <div className="card-body d-flex flex-column justify-content-around h-100">
                                            <h5 className="card-title">
                                                {author.name}
                                            </h5>
                                            <div>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    <i className="bi bi-trash3-fill"></i>{' '}
                                                    Delete
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-dark ms-2"
                                                >
                                                    <i className="bi bi-pencil-square"></i>{' '}
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {pagination && (
                    <nav>
                        <ul className="pagination">
                            <li
                                className={`page-item ${
                                    pagination.hasPrevious ? '' : 'disabled'
                                }`}
                            >
                                <a
                                    href="#"
                                    className="page-link"
                                    onClick={handlePrevious}
                                >
                                    Previous
                                </a>
                            </li>
                            <li
                                className={`page-item ${
                                    pagination.hasNext ? '' : 'disabled'
                                }`}
                            >
                                <a
                                    href="#"
                                    className="page-link"
                                    onClick={handleNext}
                                >
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
};

export default Authors;
