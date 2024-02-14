import { MouseEvent, useState } from 'react';
import { Book } from '../context/BookContext';
import DeleteModal from './DeleteModal';
import { deleteBook } from '../api/books';
import { useAppContext } from '../hooks/useAppContext';
import { useBookContext } from '../hooks/useBookContext';
import { Link, useLocation } from 'react-router-dom';

interface Props {
    book: Book;
}

const BookRow = ({ book }: Props) => {
    const { showToast } = useAppContext();
    const { currentPage, fetchBooks, pagination } = useBookContext();

    const location = useLocation();

    const [show, setShow] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        const response = await deleteBook(book._id);
        if ('error' in response) {
            console.log(response.error);
            showToast({ message: response.error, type: 'ERROR' });
        } else {
            showToast({
                message: 'Book deleted successfully',
                type: 'SUCCESS',
            });
        }
        setShow(false);
        setLoading(false);
        if (location.pathname.includes('books')) {
            if (pagination) {
                if (pagination?.count === 1 && currentPage !== 0) {
                    fetchBooks(currentPage - 1);
                }
            } else {
                fetchBooks(currentPage);
            }
        } else {
            fetchBooks(0, 3);
        }
    };

    return (
        <>
            <tr key={book._id}>
                <td width={100}>
                    <div
                        style={{
                            height: '100px',
                            width: '100px',
                        }}
                    >
                        <img
                            src={book.cover.url}
                            alt={book.title}
                            style={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />
                    </div>
                </td>
                <td>
                    <div className="d-flex flex-column">
                        <h4>{book.title}</h4>
                        <div>
                            {book.genres.map((genre) => (
                                <span
                                    key={genre}
                                    className="badge text-bg-secondary me-2"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>
                </td>
                <td>
                    {book.status === 'public' ? (
                        <i className="bi bi-eye-fill fs-5"></i>
                    ) : (
                        <i className="bi bi-eye-slash-fill fs-5"></i>
                    )}
                </td>
                <td width={100}>
                    <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={handleShow}
                    >
                        <i className="bi bi-trash3-fill"></i>
                    </button>
                    <Link
                        to={`/admin/edit-book/${book._id}`}
                        className="btn btn-sm btn-dark ms-2"
                    >
                        <i className="bi bi-pencil-square"></i>
                    </Link>
                </td>
            </tr>

            <DeleteModal
                show={show}
                handleClose={handleClose}
                handleDelete={handleDelete}
                loading={loading}
                objectType="Book"
            />
        </>
    );
};

export default BookRow;
