import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center">
                    <h3>Admin Dashboard</h3>
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
        </div>
    );
};

export default AdminDashboard;
