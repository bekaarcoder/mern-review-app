import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import bookshelfService, {
    ReadingStatus as BookReadingStatus,
} from '../services/bookshelf-service';
import { CanceledError } from 'axios';
import { useAppContext } from '../hooks/useAppContext';

interface Props {
    bookId: string;
}

type ReadStatus = 'Read' | 'Currently Reading' | 'Want To Read';

const ReadingStatus = ({ bookId }: Props) => {
    const { showToast } = useAppContext();

    const [readingStatus, setReadingStatus] =
        useState<BookReadingStatus | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleUpdateStatus = (newStatus: ReadStatus) => {
        bookshelfService
            .updateReadingStatus(bookId, { status: newStatus })
            .then((response) => {
                console.log(response.data);
                showToast({
                    message: 'Reading status updated',
                    type: 'SUCCESS',
                });
                setReadingStatus({ status: newStatus });
            })
            .catch((err) => {
                console.log(err.response.data);
                showToast({ message: 'Something went wrong', type: 'ERROR' });
            });
        setShow(false);
    };

    const handleDeleteStatus = () => {
        bookshelfService
            .removeReadingStatus(bookId)
            .then(() => {
                showToast({
                    message: 'Book removed from shelf',
                    type: 'SUCCESS',
                });
                setReadingStatus(null);
            })
            .catch((err) => {
                console.log(err.message);
                showToast({ message: 'Something went wrong', type: 'ERROR' });
            });
        setShow(false);
    };

    useEffect(() => {
        setLoading(true);
        const { request, cancel } = bookshelfService.getReadingStatus(bookId);
        request
            .then((response) => {
                if (!response.data.status) {
                    setReadingStatus(null);
                } else {
                    setReadingStatus(response.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                console.log(err.message);
                setLoading(false);
            });

        return () => cancel();
    }, [bookId]);
    return (
        <>
            {loading && (
                <button
                    className="btn btn-secondary disabled placeholder col-4"
                    aria-disabled="true"
                ></button>
            )}

            {!readingStatus && (
                <div className="btn-group">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => handleUpdateStatus('Want To Read')}
                    >
                        Want To Read
                    </button>
                    <button
                        type="button"
                        className="btn btn-success dropdown-toggle dropdown-toggle-split"
                        onClick={handleShow}
                    ></button>
                </div>
            )}

            {readingStatus && (
                <div className="d-grid">
                    <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={handleShow}
                    >
                        <i className="bi bi-pencil-fill"></i>{' '}
                        {readingStatus.status}
                    </button>
                </div>
            )}

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <h4 className="text-center">
                        Choose a shelf for this book
                    </h4>
                    <div className="d-flex flex-column gap-3">
                        <button
                            type="button"
                            className="btn btn-outline-dark"
                            onClick={() => handleUpdateStatus('Want To Read')}
                        >
                            {readingStatus?.status === 'Want To Read' && (
                                <i className="bi bi-check-circle"></i>
                            )}{' '}
                            Want To Read
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-dark"
                            onClick={() =>
                                handleUpdateStatus('Currently Reading')
                            }
                        >
                            {readingStatus?.status === 'Currently Reading' && (
                                <i className="bi bi-check-circle"></i>
                            )}{' '}
                            Currently Reading
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-dark"
                            onClick={() => handleUpdateStatus('Read')}
                        >
                            {readingStatus?.status === 'Read' && (
                                <i className="bi bi-check-circle"></i>
                            )}{' '}
                            Read
                        </button>
                        {readingStatus && (
                            <button
                                type="button"
                                className="btn btn-link text-danger text-decoration-none"
                                onClick={handleDeleteStatus}
                            >
                                <i className="bi bi-trash3-fill"></i> Remove
                                from my shelf
                            </button>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ReadingStatus;
