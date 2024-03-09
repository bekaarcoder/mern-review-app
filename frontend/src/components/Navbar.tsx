import { Link, NavLink } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import LogoutButton from './LogoutButton';

const Navbar = () => {
    const { loggedInUser, loading } = useAppContext();

    if (loading) return <></>;

    return (
        <nav
            className="navbar bg-dark navbar-expand-lg bg-body-tertiary"
            data-bs-theme="dark"
        >
            <div className="container">
                <Link className="navbar-brand" to="/">
                    StorySync
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {loggedInUser && loggedInUser.role === 'admin' ? (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'active nav-link'
                                                : 'nav-link'
                                        }
                                        to="/admin"
                                        end
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/admin/books"
                                    >
                                        Books
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/admin/authors"
                                    >
                                        Authors
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="#"
                                >
                                    Home
                                </a>
                            </li>
                        )}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/mybooks">
                                My Books
                            </NavLink>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                    </form>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            {loggedInUser ? (
                                <LogoutButton />
                            ) : (
                                <Link to="/sign-in" className="nav-link">
                                    Log in
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
