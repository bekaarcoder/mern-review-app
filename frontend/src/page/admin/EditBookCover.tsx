import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import bookService from '../../services/book-service';
import { CanceledError } from 'axios';
import TextInputField from '../../components/form/TextInputField';
import { useForm } from 'react-hook-form';
import AppButton from '../../components/AppButton';
import { useAppContext } from '../../hooks/useAppContext';

interface BookCover {
    _id: string;
    title: string;
    cover: {
        url: string;
    };
}

type BookCoverFormData = {
    cover: FileList | null;
};

const EditBookCover = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const { showToast } = useAppContext();

    const [bookCover, setBookCover] = useState<BookCover | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<BookCoverFormData>();

    const onSubmit = (data: BookCoverFormData) => {
        setLoading(true);
        const formData = new FormData();
        if (data.cover?.length) {
            formData.append('cover', data.cover[0]);
        }

        bookService
            .updateBookCover(formData, bookId!)
            .then((response) => {
                setBookCover(response.data);
                showToast({
                    message: 'Cover updated successfully',
                    type: 'SUCCESS',
                });
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                showToast({ message: 'Something went wrong', type: 'ERROR' });
                setLoading(false);
            });
    };

    useEffect(() => {
        if (bookId) {
            const { request, cancel } = bookService.getBook(bookId);
            request
                .then((response) => {
                    console.log(response.data);
                    setBookCover(response.data);
                })
                .catch((error) => {
                    if (error instanceof CanceledError) return;
                    if (error.response.status === 404) {
                        console.log('Not Found');
                    } else {
                        navigate('/not-found');
                    }
                });

            return () => cancel();
        }
    }, [bookId, navigate]);

    return (
        <div className="row justify-content-center">
            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title text-center">
                            Update Book Cover
                        </h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="d-flex gap-3 align-items-center">
                                {bookCover?.cover.url && (
                                    <img
                                        src={bookCover.cover.url}
                                        alt={bookCover.title}
                                        width={100}
                                    />
                                )}
                                <div className="flex-grow-1">
                                    <TextInputField
                                        name="cover"
                                        type="file"
                                        label={
                                            bookCover
                                                ? bookCover.title
                                                : 'Cover Image'
                                        }
                                        register={register}
                                        registerOptions={{
                                            required:
                                                'Cover image is required.',
                                        }}
                                        error={errors.cover}
                                    />
                                    <AppButton
                                        label="Upload"
                                        disabled={isSubmitting}
                                        loading={loading}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBookCover;
