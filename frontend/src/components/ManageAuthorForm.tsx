import { useForm } from 'react-hook-form';
import { useAppContext } from '../hooks/useAppContext';
import { Author } from '../models/Author';
import AppButton from './AppButton';
import TextAreaField from './form/TextAreaField';
import TextInputField from './form/TextInputField';
import { Response } from '../api/client';
import { useNavigate } from 'react-router-dom';

type AuthorFormData = {
    name: string;
    about: string;
    avatar: FileList | null;
};

interface Props {
    authorData?: Author;
    onSave: (authorFormData: FormData) => Promise<Response>;
}

const ManageAuthorForm = ({ authorData, onSave }: Props) => {
    const { showToast } = useAppContext();

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AuthorFormData>({
        defaultValues: {
            name: authorData?.name || '',
            about: authorData?.about || '',
        },
    });

    const onSubmit = async (data: AuthorFormData) => {
        console.log(data);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('about', data.about);

        if (data.avatar?.length) {
            formData.append('avatar', data.avatar[0]);
        }

        for (const [name, value] of formData) {
            console.log(name, value);
        }

        const response = await onSave(formData);
        if ('error' in response) {
            showToast({ message: response.error, type: 'ERROR' });
        } else {
            if (!authorData) {
                reset();
                showToast({
                    message: 'Author created successfully',
                    type: 'SUCCESS',
                });
            } else {
                navigate('/admin');
                showToast({
                    message: 'Author updated successfully',
                    type: 'SUCCESS',
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextInputField
                name="name"
                label="Full Name"
                type="text"
                register={register}
                registerOptions={{ required: 'Author name is required' }}
                error={errors.name}
            />
            <TextAreaField
                name="about"
                label="About"
                register={register}
                registerOptions={{ required: 'About is required' }}
                error={errors.about}
            />
            <div className="d-flex gap-3 align-items-center">
                {authorData?.avatar && (
                    <img
                        src={authorData.avatar.url}
                        alt={authorData.name}
                        width={75}
                    />
                )}
                <div className="flex-grow-1">
                    <TextInputField
                        name="avatar"
                        label="Avatar"
                        type="file"
                        register={register}
                    />
                </div>
            </div>
            <div className="d-grid mt-4">
                <AppButton label="Save Author" disabled={isSubmitting} />
            </div>
        </form>
    );
};

export default ManageAuthorForm;
