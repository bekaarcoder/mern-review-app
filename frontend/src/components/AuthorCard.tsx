import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import dummy from '../assets/dummy.jpg';
import { Author } from '../models/Author';
import DeleteModal from './DeleteModal';
import { deleteAuthor } from '../api/author';
import { useAppContext } from '../hooks/useAppContext';
import { useAuthorContext } from '../hooks/useAuthorContext';

interface Props {
    author: Author;
}

const AuthorCard = ({ author }: Props) => {
    const { showToast } = useAppContext();
    const { currentPage, fetchAuthors } = useAuthorContext();

    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(author._id);
        const response = await deleteAuthor(author._id);
        if ('error' in response) {
            console.log(response.error);
            showToast({ message: response.error, type: 'ERROR' });
        } else {
            console.log(response.data);
            showToast({
                message: 'Author deleted successfully',
                type: 'SUCCESS',
            });
        }
        setShow(false);
        fetchAuthors(currentPage);
    };

    return (
        <>
            <div className="col-sm-12 col-md-6 col-lg-4">
                <div className="card mb-3">
                    <div className="row">
                        <div className="col-4">
                            <img
                                src={author.avatar ? author.avatar.url : dummy}
                                alt="image"
                                className="img-fluid rounded-start object-fit-cover"
                            />
                        </div>
                        <div className="col-8">
                            <div className="card-body d-flex flex-column justify-content-around h-100">
                                <h5 className="card-title">{author.name}</h5>
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                        onClick={handleShow}
                                    >
                                        <i className="bi bi-trash3-fill"></i>{' '}
                                        Delete
                                    </button>
                                    <Link
                                        to={`/admin/edit-author/${author._id}`}
                                        className="btn btn-sm btn-dark ms-2"
                                    >
                                        <i className="bi bi-pencil-square"></i>{' '}
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you are reading this text in a modal!
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={handleClose}>
                        Save Changes
                    </button>
                </Modal.Footer>
            </Modal> */}

            <DeleteModal
                show={show}
                handleClose={handleClose}
                handleDelete={handleDelete}
            />
        </>
    );
};

export default AuthorCard;
