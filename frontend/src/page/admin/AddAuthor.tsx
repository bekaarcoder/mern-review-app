import { addAuthor } from '../../api/author';
import { Response } from '../../api/client';
import ManageAuthorForm from '../../components/ManageAuthorForm';

const AddAuthor = () => {
    const handleSave = async (authorFormData: FormData): Promise<Response> => {
        const response = await addAuthor(authorFormData);
        return response;
    };

    return (
        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-12 col-xl-8">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title text-center">Add Author</h3>
                        <ManageAuthorForm onSave={handleSave} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAuthor;
