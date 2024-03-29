import CurrentlyReading from '../components/CurrentlyReading';
import LatestBooks from '../components/LatestBooks';
import NotVerified from '../components/NotVerified';
import TopReviewedBooks from '../components/TopReviewedBooks';

const Home = () => {
    return (
        <div className="row">
            <div className="col-md-12">
                <NotVerified />
                <CurrentlyReading />
                <LatestBooks />
                <TopReviewedBooks />
            </div>
        </div>
    );
};

export default Home;
