import { CanceledError } from 'axios';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bookService, { Book } from '../services/book-service';

const LatestBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const { request, cancel } = bookService.getLatestBooks();
        request
            .then((response) => {
                setLoading(false);
                setBooks(response.data);
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                console.log(err.message);
                setLoading(false);
            });

        return () => cancel();
    }, []);

    return (
        <>
            <div className="row">
                {loading && (
                    <div className="col-md-12">
                        <h3 className="my-4 placeholder-glow">
                            <span className="placeholder col-3"></span>
                        </h3>
                        <div className="card border border-0 text-bg-secondary placeholder-glow">
                            <div className="card-body placeholder">
                                <p className="card-text placeholder-glow">
                                    <span className="placeholder col-12"></span>
                                    <span className="placeholder col-12"></span>
                                    <span className="placeholder col-12"></span>
                                    <span className="placeholder col-12"></span>
                                    <span className="placeholder col-12"></span>
                                    <span className="placeholder col-12"></span>
                                    <span className="placeholder col-12"></span>
                                    <span className="placeholder col-12"></span>
                                    <span className="placeholder col-12"></span>
                                    <span className="placeholder col-12"></span>
                                    <span className="placeholder col-12"></span>
                                    <span className="placeholder col-12"></span>
                                    <span className="placeholder col-12"></span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {books.length > 0 && (
                    <div className="col-md-12">
                        <h3 className="my-4">Latest Books</h3>
                        <Carousel indicators={false}>
                            {books.map((book) => (
                                <Carousel.Item key={book.id}>
                                    <div className="bg-light p-2 d-flex justify-content-center gap-5 align-items-center">
                                        <img
                                            src={book.cover.url}
                                            className="carousel-image"
                                            alt={book.title}
                                        />
                                        <div className="d-flex flex-column align-items-start">
                                            <h2 className="display-5">
                                                {book.title}
                                            </h2>
                                            <p className="lead">
                                                <small>by</small>{' '}
                                                {book.author.name}
                                            </p>
                                            <Link
                                                to={`/books/${book.id}`}
                                                className="btn btn-outline-warning btn-sm"
                                            >
                                                View Book Details
                                            </Link>
                                        </div>
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                )}
            </div>
        </>
    );
};

export default LatestBooks;
