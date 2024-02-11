import { MouseEvent } from 'react';

interface Props {
    hasNext: boolean;
    hasPrevious: boolean;
    handlePrevious: (e: MouseEvent<HTMLAnchorElement>) => void;
    handleNext: (e: MouseEvent<HTMLAnchorElement>) => void;
}

const Pagination = ({
    hasNext,
    hasPrevious,
    handleNext,
    handlePrevious,
}: Props) => {
    return (
        <nav>
            <ul className="pagination justify-content-end">
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
