import { MouseEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { searchAuthor } from '../api/author';
import { bookGenres } from '../config/book-option-config';
import { useAppContext } from '../hooks/useAppContext';
import TextAreaField from './form/TextAreaField';
import TextInputField from './form/TextInputField';

type BookFormData = {
    title: string;
    description: string;
    author: string;
    publishedDate: Date;
    status: string;
    type: string;
    genres: string[];
    tags: string;
    language: string;
    cover: FileList;
};

type AuthorType = {
    _id: string;
    name: string;
};

const ManageBookForm = () => {
    const { showToast } = useAppContext();
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>();
    const [searchResults, setSearchResults] = useState<AuthorType[]>([
        { _id: '1', name: 'Dan Brown' },
        { _id: '2', name: 'Leigh Bardugo' },
    ]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<BookFormData>();

    const onSubmit = (data: BookFormData) => {
        console.log(data);
        const formData = new FormData();
        formData.append('title', data.title);

        const allTags: string[] = data.tags.split(',');
        allTags.forEach((tag, index) => {
            formData.append(`tags[${index}]`, tag);
        });

        for (const [name, value] of formData) {
            console.log(name, value);
        }
    };

    const selectAuthor = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        setValue('author', target.value);
        setSelectedAuthorId(target.getAttribute('data-id'));
        setShowResult(false);
    };

    const onKeyUp = async () => {
        const inputValue = watch('author');
        console.log(inputValue);
        setLoading(true);
        const response = await searchAuthor({ name: inputValue });
        if ('error' in response) {
            showToast({ message: 'Something went wrong', type: 'ERROR' });
            setLoading(false);
            setSearchResults([]);
            setShowResult(false);
        } else {
            setShowResult(response.data.length > 0);
            setSearchResults(response.data);
        }
        setLoading(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                    name="title"
                    type="text"
                    label="Book Title"
                    register={register}
                    registerOptions={{ required: 'Book title is required' }}
                    error={errors.title}
                />
                <TextAreaField
                    name="description"
                    label="Book Description"
                    register={register}
                    registerOptions={{
                        required: 'Book description is required',
                    }}
                    error={errors.description}
                />
                <div className="author-search-container">
                    <TextInputField
                        name="author"
                        type="text"
                        label="Author"
                        register={register}
                        registerOptions={{ required: 'Author is required' }}
                        error={errors.author}
                        onKeyUp={onKeyUp}
                    />
                    <div
                        className="search-result"
                        style={{
                            display: showResult ? 'block' : 'none',
                        }}
                    >
                        {loading ? (
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item text-center">
                                    Loading...
                                </li>
                            </ul>
                        ) : (
                            <div className="list-group list-group-flush">
                                {searchResults.map((searchResult) => (
                                    <button
                                        type="button"
                                        className="list-group-item list-group-item-action"
                                        key={searchResult._id}
                                        data-id={searchResult._id}
                                        onClick={selectAuthor}
                                        value={searchResult.name}
                                    >
                                        {searchResult.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="d-flex gap-3">
                    <div className="flex-grow-1">
                        <TextInputField
                            name="publishedDate"
                            type="date"
                            label="Published Date"
                            register={register}
                            registerOptions={{
                                required: 'Published Date is required',
                            }}
                            error={errors.publishedDate}
                        />
                    </div>
                    <div className="flex-grow-1">
                        <TextInputField
                            name="type"
                            type="text"
                            label="Book Type"
                            register={register}
                            registerOptions={{
                                required: 'Book type is required',
                            }}
                            error={errors.type}
                        />
                    </div>
                </div>
                {/* <TextInputField
                    name="genres"
                    type="text"
                    label="Genres"
                    register={register}
                    registerOptions={{ required: 'Genre is required' }}
                    error={errors.genres}
                /> */}
                <div className="row mb-3">
                    <label className="form-label">Select Genres</label>
                    {bookGenres.map((val) => (
                        <div className="col-md-4" key={val}>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={val}
                                    value={val}
                                    {...register('genres', {
                                        validate: (values) => {
                                            if (values.length > 0) return true;
                                            return 'At least one genre should be selected';
                                        },
                                    })}
                                />
                                <label htmlFor={val}>{val}</label>
                            </div>
                        </div>
                    ))}
                    {errors.genres && (
                        <div className="text-danger text-sm">
                            <small>{errors.genres.message}</small>
                        </div>
                    )}
                </div>

                <TextInputField
                    name="tags"
                    type="text"
                    label="Tags"
                    register={register}
                    registerOptions={{ required: 'Tag is required' }}
                    error={errors.tags}
                />
                <div className="d-flex gap-3">
                    <div className="flex-grow-1">
                        <TextInputField
                            name="language"
                            type="text"
                            label="Language"
                            register={register}
                            registerOptions={{
                                required: 'Language is required',
                            }}
                            error={errors.language}
                        />
                    </div>
                    <div className="flex-grow-1">
                        <TextInputField
                            name="status"
                            type="text"
                            label="Status"
                            register={register}
                            registerOptions={{
                                required: 'Book Status is required',
                            }}
                            error={errors.status}
                        />
                    </div>
                </div>
                <TextInputField
                    name="cover"
                    type="file"
                    label="Cover Image"
                    register={register}
                    registerOptions={{
                        validate: (image) => {
                            if (image.length === 0)
                                return 'Cover Image is required';
                            return true;
                        },
                    }}
                    error={errors.cover}
                />
                <div className="d-grid">
                    <button type="submit" className="btn btn-dark">
                        Create Book
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ManageBookForm;
