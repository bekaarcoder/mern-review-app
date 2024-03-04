import { ReactNode, createContext, useReducer } from 'react';
import { Review } from '../services/review-service';

type BookDetailContextType = {
    reviews: Review[];
    userReview: Review | undefined;
    setAllReviews: (reviews: Review[]) => void;
    setUserReview: (review: Review | undefined) => void;
};

export const BookDetailContext = createContext<
    BookDetailContextType | undefined
>(undefined);

type BookDetailState = {
    reviews: Review[];
    userReview: Review | undefined;
};

const enum REDUCER_ACTION_TYPE {
    SET_REVIEWS,
    SET_USER_REVIEW,
}

type BookDetailAction =
    | { type: REDUCER_ACTION_TYPE.SET_REVIEWS; payload: Review[] }
    | {
          type: REDUCER_ACTION_TYPE.SET_USER_REVIEW;
          payload: Review | undefined;
      };

const bookDetailReducer = (
    state: BookDetailState,
    action: BookDetailAction
): BookDetailState => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.SET_REVIEWS:
            return { ...state, reviews: action.payload };
        case REDUCER_ACTION_TYPE.SET_USER_REVIEW:
            return { ...state, userReview: action.payload };
        default:
            return state;
    }
};

export const BookDetailContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [state, dispatch] = useReducer(bookDetailReducer, {
        reviews: [],
        userReview: undefined,
    });

    const setAllReviews = (reviews: Review[]) => {
        dispatch({ type: REDUCER_ACTION_TYPE.SET_REVIEWS, payload: reviews });
    };

    const setUserReview = (review: Review | undefined) => {
        dispatch({
            type: REDUCER_ACTION_TYPE.SET_USER_REVIEW,
            payload: review,
        });
    };

    return (
        <BookDetailContext.Provider
            value={{ ...state, setAllReviews, setUserReview }}
        >
            {children}
        </BookDetailContext.Provider>
    );
};
