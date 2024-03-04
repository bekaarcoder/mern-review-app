import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useAppContext } from '../hooks/useAppContext';
import { Review, ReviewFormData } from '../services/review-service';
import AppButton from './AppButton';
import TextAreaField from './form/TextAreaField';
import { useBookDetailContext } from '../hooks/useBookDetailContext';

interface Props {
    showReviewModal: boolean;
    handleCloseReviewModal: () => void;
    onSave: (data: ReviewFormData) => Promise<AxiosResponse>;
    userReview?: Review;
}

const ratings: string[] = new Array(5).fill('');

const ReviewModal = ({
    showReviewModal,
    handleCloseReviewModal,
    onSave,
    userReview,
}: Props) => {
    const { showToast } = useAppContext();
    const { setUserReview } = useBookDetailContext();
    const [hoverIndex, setHoverIndex] = useState<number>(-1);
    const [selectedIndex, setSelectedIndex] = useState<number>(
        userReview ? userReview.rating - 1 : -1
    );

    const {
        register,
        handleSubmit,
        setValue,
        formState: { isSubmitting },
    } = useForm<ReviewFormData>({
        defaultValues: {
            rating: userReview?.rating || 0,
            content: userReview?.content || '',
        },
    });

    const handleMouseEnter = (index: number) => {
        setHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(selectedIndex);
    };

    const handleRatingClick = (index: number) => {
        setSelectedIndex(index);
        setValue('rating', index + 1);
    };

    const onSubmit = (data: ReviewFormData) => {
        console.log(data);
        handleCloseReviewModal();
        onSave(data)
            .then((response) => {
                console.log(response.data);
                setUserReview(response.data);
                handleCloseReviewModal();
                showToast({
                    message: 'Review submitted successfully',
                    type: 'SUCCESS',
                });
            })
            .catch((err) => {
                if (err.response.data) {
                    showToast({
                        message: err.response.data.error,
                        type: 'ERROR',
                    });
                } else {
                    showToast({
                        message: 'Something went wrong',
                        type: 'ERROR',
                    });
                }
            });
    };

    return (
        <Modal show={showReviewModal} onHide={handleCloseReviewModal} centered>
            <Modal.Header closeButton>Rate this book</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label me-2">
                            My Rating
                        </label>
                        <span onMouseLeave={handleMouseLeave}>
                            {ratings.map((_, index) => (
                                <span
                                    key={index}
                                    className="mx-1"
                                    onClick={() => handleRatingClick(index)}
                                >
                                    <i
                                        className={
                                            index <= hoverIndex ||
                                            index <= selectedIndex
                                                ? 'bi bi-star-fill text-warning'
                                                : 'bi bi-star'
                                        }
                                        onMouseEnter={() =>
                                            handleMouseEnter(index)
                                        }
                                    ></i>
                                </span>
                            ))}
                        </span>
                    </div>
                    {/* <div className="mb-3">
                        <label htmlFor="content">What did you think?</label>
                        <textarea
                            name="content"
                            id="content"
                            cols={30}
                            rows={10}
                            className="form-control"
                        ></textarea>
                    </div> */}
                    <TextAreaField
                        name="content"
                        label="Share Your Thoughts"
                        register={register}
                    />
                    <div className="d-grid">
                        {/* <button type="submit" className="btn btn-dark">
                            Submit Review
                        </button> */}
                        <AppButton
                            label="Submit Review"
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ReviewModal;
