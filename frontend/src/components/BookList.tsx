import { Book } from '../context/BookContext';
import BookRow from './BookRow';

interface Props {
    books: Book[];
}

const BookList = ({ books }: Props) => {
    return (
        <>
            <table className="table table-responsive align-middle table-hover">
                <tbody>
                    {books?.map((book) => (
                        <BookRow book={book} />
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default BookList;
