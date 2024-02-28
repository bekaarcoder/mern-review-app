interface Props {
    rating: number;
}

const Rating = ({ rating }: Props) => {
    const totalRating = 5;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const unfilledStars = totalRating - filledStars - (hasHalfStar ? 1 : 0);

    const starsArray = [];

    for (let i = 0; i < filledStars; i++) {
        starsArray.push(<i className="bi bi-star-fill text-warning"></i>);
    }

    if (hasHalfStar) {
        starsArray.push(<i className="bi bi-star-half text-warning"></i>);
    }

    for (let i = 0; i < unfilledStars; i++) {
        starsArray.push(<i className="bi bi-star"></i>);
    }

    return (
        <>
            {starsArray.map((star, index) => (
                <span key={index} className="me-1 fs-3">
                    {star}
                </span>
            ))}
        </>
    );
};

export default Rating;
