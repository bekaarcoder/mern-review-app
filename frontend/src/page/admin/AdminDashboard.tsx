import { Link } from 'react-router-dom';
import BookList from '../../components/BookList';
import StatsCard from '../../components/StatsCard';
import { useBookContext } from '../../hooks/useBookContext';
import { useCallback, useEffect } from 'react';

const AdminDashboard = () => {
    const { books, fetchBooks } = useBookContext();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoizedFetchBooks = useCallback(fetchBooks, []);

    useEffect(() => {
        memoizedFetchBooks(0, 3);
    }, [memoizedFetchBooks]);

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="display-5">Dashboard</h2>
                    <div className="btn-group">
                        <button
                            type="button"
                            className="btn btn-dark dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Create
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="/admin/create-book"
                                >
                                    <i className="bi bi-journal-plus"></i> Add
                                    Book
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="/admin/create-author"
                                >
                                    <i className="bi bi-person-badge"></i> Add
                                    Author
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-md-12 my-4">
                <div className="row justify-content-center">
                    <StatsCard title="Books" subTitle="100" />
                    <StatsCard title="Authors" subTitle="100" />
                    <StatsCard title="Reviews" subTitle="100" />
                    <StatsCard title="Users" subTitle="100" />
                </div>
            </div>
            <div className="col-md-12">
                <h4>Recent Uploads</h4>
                {books && <BookList books={books} />}
            </div>
        </div>
    );
};

export default AdminDashboard;
