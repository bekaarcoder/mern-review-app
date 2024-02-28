const BookDetailsPlaceholder = () => {
    return (
        <>
            <div className="col-md-4 d-flex justify-content-center">
                <div className="img-placeholder bg-secondary rounded"></div>
            </div>
            <div className="col-md-8 placeholder-glow">
                <h2>
                    <span className="placeholder col-5"></span>
                </h2>
                <span className="placeholder col-3"></span>
                <p>
                    <span className="placeholder col-12 placeholder-xs"></span>
                    <span className="placeholder col-12 placeholder-xs"></span>
                    <span className="placeholder col-12 placeholder-xs"></span>
                    <span className="placeholder col-12 placeholder-xs"></span>
                    <span className="placeholder col-12 placeholder-xs"></span>
                    <span className="placeholder col-12 placeholder-xs"></span>
                    <span className="placeholder col-6 placeholder-xs"></span>
                </p>
                <p>
                    <span className="placeholder col-3 placeholder-sm"></span>
                </p>
                <p>
                    <span className="placeholder col-2 placeholder-sm me-2"></span>
                    <span className="placeholder col-2 placeholder-sm me-2"></span>
                    <span className="placeholder col-2 placeholder-sm me-2"></span>
                    <span className="placeholder col-2 placeholder-sm"></span>
                </p>
            </div>
        </>
    );
};

export default BookDetailsPlaceholder;
