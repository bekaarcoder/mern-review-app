import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import LogoutButton from './LogoutButton';
import { FormEvent, useState } from 'react';
import bookService, { Book } from '../services/book-service';

const Navbar = () => {
    const { loggedInUser, loading } = useAppContext();
    const navigate = useNavigate();

    const [query, setQuery] = useState<string>('');
    const [result, setResult] = useState<Book[]>([]);
    const [showResult, setShowResult] = useState<boolean>(false);

    const handleKeyUp = () => {
        console.log(query);
        if (query.toString() !== '') {
            bookService
                .searchBook(query)
                .then((response) => {
                    setResult(response.data);
                    setShowResult(response.data.length > 0);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } else {
            setResult([]);
            setShowResult(false);
        }
    };

    const handleClick = (e: FormEvent<HTMLButtonElement>, bookId: string) => {
        e.preventDefault();
        navigate(`/books/${bookId}`);
        setShowResult(false);
        setQuery('');
    };

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
                    <form
                        className="d-flex flex-grow-1 position-relative"
                        role="search"
                    >
                        <span className="position-absolute top-50 end-0 translate-middle-y me-4">
                            <i className="bi bi-search text-secondary"></i>
                        </span>
                        <input
                            className="form-control me-2 ms-5"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                            name="query"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={handleKeyUp}
                        />
                        <div
                            className={`position-absolute bg-white z-3 top-100 start-0 ms-5 rounded shadow bg-light ${
                                showResult ? 'd-block' : 'd-none'
                            }`}
                            style={{ width: 'calc(100% - 56px)' }}
                        >
                            <div className="list-group list-group-flush rounded">
                                {result.map((rs) => (
                                    <button
                                        type="button"
                                        key={rs._id}
                                        className="list-group-item list-group-item-action bg-light text-secondary d-flex gap-2"
                                        onClick={(e) => handleClick(e, rs._id)}
                                    >
                                        <img
                                            src={rs.cover.url}
                                            alt={rs.title}
                                            width={25}
                                        />
                                        <div className="d-flex flex-column">
                                            <small className="text-dark">
                                                {rs.title}
                                            </small>
                                            <small>{rs.author.name}</small>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
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
