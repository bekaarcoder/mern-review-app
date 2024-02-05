import { useState, useEffect } from 'react';
import { getBooks } from '../api/books';
import { useAppContext } from '../hooks/useAppContext';

type Book = {
    _id: string;
    title: string;
    genres: string[];
    cover: {
        url: string;
    };
    status: string;
};

const BookList = () => {
    const { showToast } = useAppContext();

    const [latestBooks, setLatestBooks] = useState<Book[] | null>([]);

    console.log(latestBooks);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await getBooks();
            if ('error' in response) {
                showToast({ message: response.error, type: 'ERROR' });
            } else {
                setLatestBooks(response.data);
            }
        };

        fetchBooks();
    }, [showToast]);
    return (
        <table className="table table-responsive align-middle table-hover">
            <tbody>
                {latestBooks?.map((book) => (
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
                        <td>
                            <button
                                type="button"
                                className="btn btn-sm btn-danger"
                            >
                                <i className="bi bi-trash3-fill"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-dark ms-2"
                            >
                                <i className="bi bi-pencil-square"></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BookList;
