import { useEffect, useState } from 'react';
import { ReadingShelf } from '../page/MyBooks';
import bookshelfService, {
    ReadingShelfCount,
} from '../services/bookshelf-service';
import { CanceledError } from 'axios';
import { useSearchParams } from 'react-router-dom';

interface Props {
    handleSearchParam: (shelf: ReadingShelf) => void;
}

const ReadingStatusCount = ({ handleSearchParam }: Props) => {
    const [count, setCount] = useState<ReadingShelfCount | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [searchParams] = useSearchParams();

    const isActive = (shelf: string) => {
        return searchParams.get('shelf') === shelf;
    };

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
            <div
                className={`link ${
                    isActive('All') ? 'text-dark' : 'text-secondary'
                }`}
                onClick={() => handleSearchParam('All')}
            >
                All ({count?.all})
            </div>
            <div
                className={`link ${
                    isActive('Read') ? 'text-dark' : 'text-secondary'
                }`}
                onClick={() => handleSearchParam('Read')}
            >
                Read ({count?.read})
            </div>
            <div
                className={`link ${
                    isActive('Currently Reading')
                        ? 'text-dark'
                        : 'text-secondary'
                }`}
                onClick={() => handleSearchParam('Currently Reading')}
            >
                Currently Reading ({count?.currentlyReading})
            </div>
            <div
                className={`link ${
                    isActive('Want To Read') ? 'text-dark' : 'text-secondary'
                }`}
                onClick={() => handleSearchParam('Want To Read')}
            >
                Want To Read ({count?.wantToRead})
            </div>
        </>
    );
};

export default ReadingStatusCount;
