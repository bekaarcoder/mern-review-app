import client from '../api/client';

export interface ReviewFormData {
    rating: number;
    content: string;
}

export interface Review {
    _id: string;
    rating: number;
    parentBook: string;
    content: string;
    owner: {
        _id: string;
        username: string;
    };
    createdAt: string;
    updatedAt: string;
}

class ReviewService {
    addReview(bookId: string, data: ReviewFormData) {
        return client.post(`/reviews/add/${bookId}`, data, {
            withCredentials: true,
        });
    }

    updateReview(reviewId: string, data: ReviewFormData) {
        return client.patch(`/reviews/${reviewId}`, data, {
            withCredentials: true,
        });
    }

    getReviews(bookId: string) {
        const controller = new AbortController();
        const request = client.get<Review[]>(`/reviews/${bookId}`, {
            withCredentials: true,
            signal: controller.signal,
        });
        return { request, cancel: () => controller.abort() };
    }

    deleteReview(reviewId: string) {
        return client.delete(`/reviews/${reviewId}`, {
            withCredentials: true,
        });
    }
}

export default new ReviewService();
