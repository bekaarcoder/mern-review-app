import { addBook } from '../../api/books';
import { Response } from '../../api/client';
import ManageBookForm from '../../components/ManageBookForm';

const AddBook = () => {
    const handleSave = async (data: FormData): Promise<Response> => {
        const response = await addBook(data);
        return response;
    };

    return (
        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-12 col-xl-8">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title text-center">Add Book</h3>
                        <ManageBookForm onSave={handleSave} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBook;
