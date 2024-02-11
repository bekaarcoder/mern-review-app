import { Author } from '../models/Author';
import AuthorCard from './AuthorCard';

interface Props {
    authors: Author[];
}

const AuthorList = ({ authors }: Props) => {
    return (
        <div className="row">
            {authors?.map((author) => (
                <AuthorCard author={author} key={author._id} />
            ))}
        </div>
    );
};

export default AuthorList;
