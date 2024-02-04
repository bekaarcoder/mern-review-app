import { useNavigate, useParams } from 'react-router-dom';
import ManageBookForm from '../../components/ManageBookForm';
import { useEffect, useState } from 'react';
import { BookData, getBook, updateBook } from '../../api/books';
import { useAppContext } from '../../hooks/useAppContext';
import { Book, formDataToBookData } from '../../models/Book';
import { Response } from '../../api/client';

const EditBookDetail = () => {
    const { bookId } = useParams();
    const { showToast } = useAppContext();

    const navigate = useNavigate();

    const [bookData, setBookData] = useState<Book>();

    const handleUpdate = async (bookFormData: FormData): Promise<Response> => {
        const updatedBookData: BookData = formDataToBookData(bookFormData);
        const response = await updateBook(updatedBookData, bookId!);
        return response;
    };

    useEffect(() => {
        const fetchBook = async (id: string) => {
            const response = await getBook(id);
            if ('error' in response) {
                navigate('/admin');
                showToast({ message: response.error, type: 'ERROR' });
            } else {
                setBookData(response.data);
            }
        };

        if (bookId) {
            fetchBook(bookId);
        }
    }, [bookId, navigate, showToast]);
    return (
        <div className="row justify-content-center">
            <div className="col-md-12 col-sm-12 col-xl-8">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title text-center">
                            Edit Book Detail
                        </h3>
                        {bookData && (
                            <ManageBookForm
                                bookData={bookData}
                                onSave={handleUpdate}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBookDetail;
