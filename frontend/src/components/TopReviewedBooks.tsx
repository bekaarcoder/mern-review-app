import { useEffect, useState } from 'react';
import { getTopReviewedBooks } from '../api/books';
import BookCard from './BookCard';

type Book = {
    id: string;
    title: string;
    cover: string;
    averageRating: string;
};

const TopReviewedBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await getTopReviewedBooks();
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
            <h3 className="my-4">Top Reviewed Books</h3>
            <div className="row">
                {books.length && books.map((book) => <BookCard book={book} />)}
            </div>
        </>
    );
};

export default TopReviewedBooks;
