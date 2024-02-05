import { Link } from 'react-router-dom';
import BookList from '../../components/BookList';
import StatsCard from '../../components/StatsCard';

const AdminDashboard = () => {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>Admin Dashboard</h2>
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
                    <StatsCard title="Total Uploads" subTitle="100" />
                    <StatsCard title="Total Reviews" subTitle="100" />
                    <StatsCard title="Total Users" subTitle="100" />
                </div>
            </div>
            <div className="col-md-12">
                <h4>Recent Uploads</h4>
                <BookList />
            </div>
        </div>
    );
};

export default AdminDashboard;
