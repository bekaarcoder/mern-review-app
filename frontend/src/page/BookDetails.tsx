import { CanceledError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookDetailsPlaceholder from '../components/BookDetailsPlaceholder';
import BookReviews from '../components/BookReviews';
import Rating from '../components/Rating';
import ReadingStatus from '../components/ReadingStatus';
import ReviewModal from '../components/ReviewModal';
import { formatDate } from '../config/helper';
import { useAppContext } from '../hooks/useAppContext';
import { useBookDetailContext } from '../hooks/useBookDetailContext';
import bookService, { Book } from '../services/book-service';
import reviewService, { ReviewFormData } from '../services/review-service';

const BookDetails = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();

    const { userReview } = useBookDetailContext();
    const { loggedInUser } = useAppContext();

    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState('');
    const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
    const [showUpdateReviewModal, setShowUpdateReviewModal] =
        useState<boolean>(false);

    const handleCloseReviewModal = () => {
        setShowReviewModal(false);
    };

    const handleShowReviewModal = () => {
        setShowReviewModal(true);
    };

    const addReview = (data: ReviewFormData) => {
        return reviewService.addReview(bookId!, data);
    };

    const updateReview = (data: ReviewFormData) => {
        return reviewService.updateReview(userReview!._id, data);
    };

    useEffect(() => {
        if (bookId) {
            setLoading(true);
            const { request, cancel } = bookService.getBook(bookId);
            request
                .then((res) => {
                    setLoading(false);
                    console.log(res.data);
                    setBook(res.data);
                })
                .catch((err) => {
                    if (err instanceof CanceledError) return;
                    if (err.response.status === 404) {
                        setError(
                            "The book you're are searching for appears to be unavailable."
                        );
                    } else {
                        navigate('/not-found');
                    }
                    setLoading(false);
                });

            return () => cancel();
        }
    }, [bookId, navigate]);

    return (
        <div className="row mt-5">
            {loading && <BookDetailsPlaceholder />}

            {!loading && error && (
                <div className="col-md-12">
                    <p className="lead text-center">{error}</p>
                </div>
            )}

            {!loading && book && (
                <>
                    <div className="col-md-4 d-flex flex-column align-items-center gap-3">
                        <img
                            src={book?.cover.url}
                            alt={book?.title}
                            className="img-fluid rounded mx-auto d-block"
                            width={'60%'}
                        />
                        {loggedInUser && <ReadingStatus bookId={book._id} />}
                        {loggedInUser &&
                            (userReview ? (
                                <>
                                    <div className="d-flex">
                                        <Rating rating={userReview.rating} />
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-outline-dark btn-sm"
                                            onClick={() =>
                                                setShowUpdateReviewModal(true)
                                            }
                                        >
                                            <i className="bi bi-pencil"></i>{' '}
                                            Update Rating
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <button
                                    className="btn btn-link link-underline-secondary text-secondary"
                                    type="button"
                                    onClick={handleShowReviewModal}
                                >
                                    Rate this book
                                </button>
                            ))}
                    </div>
                    <div className="col-md-8">
                        <h2>{book?.title}</h2>
                        <p className="lead">{book?.author.name}</p>
                        <p className="d-flex align-items-center">
                            <Rating
                                rating={parseFloat(
                                    book?.averageRating
                                        ? book.averageRating
                                        : '0'
                                )}
                            />
                            <span className="fs-3 fw-medium mx-3">
                                {book?.averageRating}
                            </span>
                            <span className="text-muted">
                                {book.reviewCount > 0 ? book.reviewCount : 0}{' '}
                                review
                                {book.reviewCount > 1 && 's'}
                            </span>
                        </p>
                        <p>{book.description}</p>
                        <p className="text-muted">{book.type}</p>
                        <p>
                            <strong className="me-2">Genres</strong>{' '}
                            {book.genres.map((genre) => (
                                <span
                                    className="me-3 text-decoration-underline"
                                    key={genre}
                                >
                                    {genre}
                                </span>
                            ))}
                        </p>
                        <p>
                            <strong className="me-2">Published</strong>{' '}
                            {formatDate(book.publishedDate)}
                        </p>
                        <hr />
                        <h3>Ratings & Reviews</h3>
                        {bookId && <BookReviews bookId={bookId} />}
                    </div>

                    <ReviewModal
                        showReviewModal={showReviewModal}
                        handleCloseReviewModal={handleCloseReviewModal}
                        onSave={addReview}
                    />

                    {userReview && (
                        <ReviewModal
                            showReviewModal={showUpdateReviewModal}
                            handleCloseReviewModal={() =>
                                setShowUpdateReviewModal(false)
                            }
                            onSave={updateReview}
                            userReview={userReview}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default BookDetails;
