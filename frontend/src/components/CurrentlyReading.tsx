import { CanceledError } from 'axios';
import { useEffect, useState } from 'react';
import bookshelfService, {
    ReadingShelfBook,
} from '../services/bookshelf-service';
import CurrentlyReadingBook from './CurrentlyReadingBook';
import { useAppContext } from '../hooks/useAppContext';

const CurrentlyReading = () => {
    const { loggedInUser } = useAppContext();
    const [currentBooks, setCurrentBooks] = useState<ReadingShelfBook[]>([]);

    useEffect(() => {
        const { request, cancel } =
            bookshelfService.getBookByReadingShelf('Currently Reading');

        request
            .then((response) => {
                setCurrentBooks(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                if (error instanceof CanceledError) return;
                console.log(error.message);
            });

        return () => cancel();
    }, []);

    if (currentBooks.length === 0 || !loggedInUser) return <></>;

    return (
        <>
            <div className="row">
                <h3 className="my-4">Currently Reading</h3>
                {currentBooks.map((book) => (
                    <CurrentlyReadingBook book={book} key={book._id} />
                ))}
            </div>
        </>
    );
};

export default CurrentlyReading;
