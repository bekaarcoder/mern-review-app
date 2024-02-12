import { MouseEvent } from 'react';
import { Modal } from 'react-bootstrap';

interface Props {
    show: boolean;
    handleClose: () => void;
    handleDelete: (e: MouseEvent<HTMLButtonElement>) => void;
    loading: boolean;
    objectType: 'Author' | 'Book';
}

const DeleteModal = ({
    show,
    handleClose,
    handleDelete,
    loading,
    objectType,
}: Props) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {objectType}?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to delete this{' '}
                    {objectType.toLowerCase()}?
                </p>
                <div className="d-flex justify-content-end">
                    <button
                        className="btn btn-sm btn-secondary"
                        onClick={handleClose}
                    >
                        Close
                    </button>
                    <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm"
                                    aria-hidden="true"
                                ></span>
                                <span role="status" className="ms-1">
                                    Deleting...
                                </span>
                            </>
                        ) : (
                            <>Delete</>
                        )}
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default DeleteModal;
