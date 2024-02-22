import { useEffect, useState } from 'react';
import { getLatestBooks } from '../api/books';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type Book = {
    id: string;
    title: string;
    cover: { url: string };
    author: { name: string };
};

const LatestBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await getLatestBooks();
            if ('error' in response) {
                console.log(response.error);
            } else {
                setBooks(response.data);
            }
        };

        fetchBooks();
    }, []);

    return (
        <>
            <h3 className="my-4">Latest Books</h3>
            <div className="row">
                <div className="col-md-12">
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
                                            <small>by</small> {book.author.name}
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
            </div>
        </>
    );
};

export default LatestBooks;
