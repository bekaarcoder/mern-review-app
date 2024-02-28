import { Link } from 'react-router-dom';

type Book = {
    id: string;
    title: string;
    cover: string;
    averageRating: string;
};

interface Props {
    book: Book;
}

const BookCard = ({ book }: Props) => {
    return (
        <div className="col-2 col-md-2 flex-grow-1">
            <div className="card cursor-pointer h-100">
                <Link
                    to={`/books/${book.id}`}
                    className="text-reset text-decoration-none"
                >
                    <img
                        src={book.cover}
                        alt={book.title}
                        className="card-img-top"
                    />
                    <div className="card-body">
                        <div className="card-text">{book.title}</div>
                        <div>
                            <i className="bi bi-star-fill text-warning"></i>{' '}
                            {book.averageRating ? book.averageRating : '0'}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default BookCard;
