import { useEffect, useState } from 'react';
import bookshelfService, {
    ReadingShelfBook,
} from '../services/bookshelf-service';
import { CanceledError } from 'axios';
import { formatDate } from '../config/helper';
import { useSearchParams } from 'react-router-dom';
import ReadingStatusCount from '../components/ReadingStatusCount';

export type ReadingShelf =
    | 'Want To Read'
    | 'Read'
    | 'Currently Reading'
    | 'All';

const MyBooks = () => {
    const [shelfBooks, setShelfBooks] = useState<ReadingShelfBook[]>([]);

    const [searchParams, setSearchParams] = useSearchParams();

    const handleSearchParam = (shelf: ReadingShelf) => {
        console.log(shelf);
        setSearchParams({ shelf: shelf });
    };

    useEffect(() => {
        const shelf = searchParams.get('shelf')
            ? searchParams.get('shelf')
            : 'All';
        const { request, cancel } = bookshelfService.getBookByReadingShelf(
            shelf!
        );

        request
            .then((response) => {
                setShelfBooks(response.data);
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                console.log(err.message);
            });

        return () => cancel();
    }, [searchParams]);

    return (
        <div className="row my-5">
            <h3>My Books</h3>
            <div className="col-md-2">
                <div className="d-flex flex-column gap-1">
                    <strong>Bookshelves</strong>
                    <ReadingStatusCount handleSearchParam={handleSearchParam} />
                </div>
            </div>
            <div className="col-md-10">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Cover</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Shelf</th>
                            <th>Date Added</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {shelfBooks.map((shelfBook) => (
                            <tr key={shelfBook._id}>
                                <td>
                                    <img
                                        src={shelfBook.book.cover.url}
                                        alt={shelfBook.book.title}
                                        width={50}
                                    />
                                </td>
                                <td>{shelfBook.book.title}</td>
                                <td>{shelfBook.book.author.name}</td>
                                <td>{shelfBook.status}</td>
                                <td>{formatDate(shelfBook.updatedAt)}</td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBooks;
