interface Props {
    title: string;
    subTitle: number;
}

const StatsCard = ({ title, subTitle }: Props) => {
    return (
        <div className="col-3 col-sm-3 col-md-3 col-xl-3">
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
