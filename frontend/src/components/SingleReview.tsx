import { formatDate } from '../config/helper';
import { Review } from '../services/review-service';
import Rating from './Rating';

interface Props {
    review: Review;
}

const SingleReview = ({ review }: Props) => {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span>
                    <Rating rating={review.rating} size={5} />
                </span>
                {review.updatedAt && formatDate(review.updatedAt)}
            </div>
            <p>{review.content}</p>
        </>
    );
};

export default SingleReview;
