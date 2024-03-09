import { useEffect, useState } from 'react';
import { ReadingShelf } from '../page/MyBooks';
import bookshelfService, {
    ReadingShelfCount,
} from '../services/bookshelf-service';
import { CanceledError } from 'axios';

interface Props {
    handleSearchParam: (shelf: ReadingShelf) => void;
}

const ReadingStatusCount = ({ handleSearchParam }: Props) => {
    const [count, setCount] = useState<ReadingShelfCount | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const { request, cancel } = bookshelfService.getAllReadingShelfCounts();
        request
            .then((response) => {
                setCount(response.data);
                setLoading(false);
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                console.log(err.message);
                setLoading(false);
            });

        return () => cancel();
    }, []);

    if (loading)
        return (
            <>
                <div className="placeholder-glow">
                    <span className="placeholder col-4"></span>
                </div>
                <div className="placeholder-glow">
                    <span className="placeholder col-4"></span>
                </div>
                <div className="placeholder-glow">
                    <span className="placeholder col-6"></span>
                </div>
                <div className="placeholder-glow">
                    <span className="placeholder col-5"></span>
                </div>
            </>
        );

    return (
        <>
            <div className="link" onClick={() => handleSearchParam('All')}>
                All ({count?.all})
            </div>
            <div
                className="link text-secondary"
                onClick={() => handleSearchParam('Read')}
            >
                Read ({count?.read})
            </div>
            <div
                className="link text-secondary"
                onClick={() => handleSearchParam('Currently Reading')}
            >
                Currently Reading ({count?.currentlyReading})
            </div>
            <div
                className="link text-secondary"
                onClick={() => handleSearchParam('Want To Read')}
            >
                Want To Read ({count?.wantToRead})
            </div>
        </>
    );
};

export default ReadingStatusCount;
