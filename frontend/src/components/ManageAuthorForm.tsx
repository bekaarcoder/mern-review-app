import { useForm } from 'react-hook-form';
import TextInputField from './form/TextInputField';
import TextAreaField from './form/TextAreaField';
import { addAuthor } from '../api/author';
import { useAppContext } from '../hooks/useAppContext';
import AppButton from './AppButton';

type AuthorFormData = {
    name: string;
    about: string;
    avatar: FileList | null;
};
const ManageAuthorForm = () => {
    const { showToast } = useAppContext();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AuthorFormData>();

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

        const response = await addAuthor(formData);
        if ('error' in response) {
            console.log(response.error);
            showToast({ message: response.error, type: 'ERROR' });
        } else {
            console.log(response.data);
            reset();
            showToast({
                message: 'Author added successfully',
                type: 'SUCCESS',
            });
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
            <TextInputField
                name="avatar"
                label="Avatar"
                type="file"
                register={register}
            />
            <div className="d-grid">
                <AppButton label="Create Author" disabled={isSubmitting} />
            </div>
        </form>
    );
};

export default ManageAuthorForm;
