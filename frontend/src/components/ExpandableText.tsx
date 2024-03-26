import { useState } from 'react';

interface Props {
    children: string;
    maxChars?: number;
}

const ExpandableText = ({ children, maxChars = 300 }: Props) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    if (children.length <= maxChars)
        return (
            <p>
                <small>{children}</small>
            </p>
        );

    const text = isExpanded
        ? children
        : `${children.substring(0, maxChars)}...`;

    return (
        <>
            <p>
                <small>{text}</small>
            </p>
            <div className="d-grid">
                <button
                    type="button"
                    className="btn btn-link text-dark text-decoration-none"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? (
                        <>
                            Show Less <i className="bi bi-chevron-up"></i>
                        </>
                    ) : (
                        <>
                            Show more <i className="bi bi-chevron-down"></i>
                        </>
                    )}
                </button>
            </div>
        </>
    );
};

export default ExpandableText;
