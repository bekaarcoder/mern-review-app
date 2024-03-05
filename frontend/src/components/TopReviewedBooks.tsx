import { CanceledError } from 'axios';
import { useEffect, useState } from 'react';
import bookService, { ReviewedBook } from '../services/book-service';
import BookCard from './BookCard';

const TopReviewedBooks = () => {
    const [books, setBooks] = useState<ReviewedBook[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const { request, cancel } = bookService.getTopReviewedBooks();
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
            {loading && (
                <h3 className="my-4 placeholder-glow">
                    <span className="placeholder col-3"></span>
                </h3>
            )}
            <div className="row">
                {books.length > 0 && (
                    <>
                        <h3 className="my-4">Top Reviewed Books</h3>
                        {books.map((book) => (
                            <BookCard book={book} key={book.id} />
                        ))}
                    </>
                )}
            </div>
        </>
    );
};

export default TopReviewedBooks;
