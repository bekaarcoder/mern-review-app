const StatusCardPlaceholder = () => {
    return (
        <div className="col-3 col-sm-3 col-md-3 col-xl-3">
            <div className="card text-bg-secondary">
                <div className="card-body">
                    <h4 className="card-title placeholder-glow">
                        <span className="placeholder col-7"></span>
                    </h4>
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-2"></span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StatusCardPlaceholder;
