import { CanceledError } from 'axios';
import { MouseEvent, useEffect, useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { useBookDetailContext } from '../hooks/useBookDetailContext';
import reviewService from '../services/review-service';
import SingleReview from './SingleReview';
import DeleteModal from './DeleteModal';

interface Props {
    bookId: string;
}

const BookReviews = ({ bookId }: Props) => {
    const { loggedInUser, showToast } = useAppContext();
    const { reviews, userReview, setAllReviews, setUserReview } =
        useBookDetailContext();

    // const [reviews, setReviews] = useState<Review[]>([]);
    // const [userReview, setUserReview] = useState<Review | undefined>(undefined);

    const [loading, setLoading] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    const handleDeleteReview = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        reviewService
            .deleteReview(userReview!._id)
            .then(() => {
                setLoading(false);
                setShow(false);
                setUserReview(undefined);
                showToast({
                    message: 'Review deleted successfully',
                    type: 'SUCCESS',
                });
            })
            .catch((err) => {
                console.log(err.message);
                showToast({ message: 'Something went wrong', type: 'ERROR' });
                setLoading(false);
                setShow(false);
            });
    };

    useEffect(() => {
        if (bookId) {
            const { request, cancel } = reviewService.getReviews(bookId);
            request
                .then((res) => {
                    console.log(res.data);
                    const reviewFound = res.data.find(
                        (review) =>
                            review.owner.username === loggedInUser?.username
                    );
                    if (reviewFound) {
                        const otherReviews = res.data.filter(
                            (review) => review._id !== reviewFound?._id
                        );
                        // setReviews(otherReviews);
                        setAllReviews(otherReviews);
                        setUserReview(reviewFound);
                    } else {
                        // setReviews(res.data);
                        setAllReviews(res.data);
                    }
                })
                .catch((err) => {
                    if (err instanceof CanceledError) return;
                    console.log(err);
                });

            return () => cancel();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookId, loggedInUser]);

    return (
        <>
            {userReview && (
                <>
                    <h5>My Review</h5>
                    <SingleReview review={userReview} />
                    <button
                        className="btn btn-link btn-sm text-danger"
                        onClick={() => setShow(true)}
                    >
                        <i className="bi bi-trash"></i> Remove review
                    </button>
                    <hr />
                    <DeleteModal
                        show={show}
                        handleClose={() => setShow(false)}
                        handleDelete={handleDeleteReview}
                        loading={loading}
                        objectType="Review"
                    />
                </>
            )}

            {reviews.length > 0 &&
                reviews.map((review) => (
                    <div key={review._id}>
                        <strong>{review.owner.username}</strong>
                        <SingleReview review={review} />
                    </div>
                ))}
        </>
    );
};

export default BookReviews;
