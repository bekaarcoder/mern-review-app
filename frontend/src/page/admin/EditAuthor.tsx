import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthor, updateAuthor } from '../../api/author';
import { useAppContext } from '../../hooks/useAppContext';
import { Author } from '../../models/Author';
import ManageAuthorForm from '../../components/ManageAuthorForm';
import { Response } from '../../api/client';

const EditAuthor = () => {
    const { authorId } = useParams();
    const navigate = useNavigate();

    const { showToast } = useAppContext();

    const [authorData, setAuthorData] = useState<Author>();

    const handleUpdate = async (
        authorFormData: FormData
    ): Promise<Response> => {
        const response = await updateAuthor(authorFormData, authorId!);
        return response;
    };

    useEffect(() => {
        const fetchAuthor = async (id: string) => {
            const response = await getAuthor(id);
            if ('error' in response) {
                navigate('/admin');
                showToast({ message: response.error, type: 'ERROR' });
            } else {
                console.log(response.data);
                setAuthorData(response.data);
            }
        };

        if (authorId) {
            fetchAuthor(authorId);
        }
    }, [authorId, showToast, navigate]);

    return (
        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-12 col-xl-8">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title text-center">Edit Author</h3>
                        {authorData && (
                            <ManageAuthorForm
                                authorData={authorData}
                                onSave={handleUpdate}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditAuthor;
