import { MouseEvent } from 'react';

interface Props {
    hasNext: boolean;
    hasPrevious: boolean;
    currentPage: number;
    totalPage: number;
    handlePrevious: (e: MouseEvent<HTMLAnchorElement>) => void;
    handleNext: (e: MouseEvent<HTMLAnchorElement>) => void;
}

const Pagination = ({
    hasNext,
    hasPrevious,
    currentPage,
    totalPage,
    handleNext,
    handlePrevious,
}: Props) => {
    return (
        <nav className="d-flex justify-content-between align-items-center">
            <span>
                Page {currentPage + 1} of {totalPage}
            </span>
            <ul className="pagination justify-content-end align-items-center">
                {hasPrevious && (
                    <li className="page-item">
                        <a
                            href="#"
                            className="page-link"
                            onClick={handlePrevious}
                        >
                            Previous
                        </a>
                    </li>
                )}
                {hasNext && (
                    <li className="page-item">
                        <a href="#" className="page-link" onClick={handleNext}>
                            Next
                        </a>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
