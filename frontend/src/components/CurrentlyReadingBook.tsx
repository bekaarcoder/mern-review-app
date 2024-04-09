import { FormEvent, useState } from 'react';
import { ReadingShelfBook } from '../services/bookshelf-service';
import { Modal } from 'react-bootstrap';
import bookshelfService from '../services/bookshelf-service';
import { useAppContext } from '../hooks/useAppContext';

interface Props {
    book: ReadingShelfBook;
}
const CurrentlyReadingBook = ({ book }: Props) => {
    const { showToast } = useAppContext();
    const [show, setShow] = useState<boolean>(false);
    const [readingProgress, setReadingProgress] = useState<number | undefined>(
        book.completionPercentage
    );
    const [progress, setProgress] = useState<string | undefined>(
        book.completionPercentage?.toString()
    );
    const [progressType, setProgressType] = useState<string>('percentage');

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (progress) {
            let progressPercentage = parseInt(progress);
            if (
                progressType === 'pages' &&
                parseInt(progress) <= book.book.pages
            ) {
                progressPercentage = Math.ceil(
                    (parseInt(progress) / book.book.pages) * 100
                );
            }
            bookshelfService
                .updateReadingProgress(book.book._id, {
                    progress: progressPercentage,
                })
                .then((response) => {
                    console.log(response.data);
                    showToast({
                        message: 'Reading progress updated',
                        type: 'SUCCESS',
                    });
                    setReadingProgress(progressPercentage);
                })
                .catch((error) => {
                    console.log(error);
                    showToast({
                        message: 'Something went wrong',
                        type: 'ERROR',
                    });
                });
            handleClose();
        }
    };

    return (
        <>
            <div className=" col-sm-6 col-md-6 col-lg-4 my-2" key={book._id}>
                <div className="card h-100">
                    <div className="card-body d-flex gap-3 align-items-center">
                        <img
                            src={book.book.cover.url}
                            alt={book.book.title}
                            width={85}
                        />
                        <div className="flex-grow-1">
                            <h6>{book.book.title}</h6>
                            <div>
                                <small>by {book.book.author.name}</small>
                            </div>
                            {readingProgress && (
                                <div className="progress my-2">
                                    <div
                                        className="progress-bar bg-warning text-dark"
                                        style={{
                                            width: `${readingProgress}%`,
                                        }}
                                    >
                                        {readingProgress}%
                                    </div>
                                </div>
                            )}
                            <button
                                className="btn btn-sm btn-outline-dark"
                                onClick={handleShow}
                            >
                                Update Progress
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>Update Progress</Modal.Header>
                <Modal.Body>
                    <form
                        className="row row-cols-lg-auto g-3 align-items-center justify-content-center"
                        onSubmit={handleSubmit}
                    >
                        <div className="col-12">
                            <label className="visually-hidden">Progress</label>
                            <div className="input-group">
                                <div className="input-group-text">
                                    {progressType === 'percentage' ? '%' : '#'}
                                </div>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="progress"
                                    value={progress}
                                    onChange={(e) =>
                                        setProgress(e.target.value)
                                    }
                                />
                                {progressType === 'pages' && (
                                    <div className="input-group-text">
                                        of {book.book.pages}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-12">
                            <label className="visually-hidden">
                                Progress Type
                            </label>
                            <select
                                className="form-select"
                                name="progressType"
                                value={progressType}
                                onChange={(e) =>
                                    setProgressType(e.target.value)
                                }
                            >
                                <option value="percentage">%</option>
                                <option value="pages">Pages</option>
                            </select>
                        </div>

                        <div className="col-12">
                            <button
                                type="submit"
                                className="btn btn-dark"
                                disabled={!progress}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CurrentlyReadingBook;
