interface Props {
    title: string;
    subTitle: string;
}

const StatsCard = ({ title, subTitle }: Props) => {
    return (
        <div className="col-md-4 col-xl-3">
            <div className="card text-bg-secondary">
                <div className="card-body">
                    <h4 className="card-title">{title}</h4>
                    <p className="card-text">{subTitle}</p>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
