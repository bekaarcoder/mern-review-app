import { MouseEvent } from 'react';
import { Modal } from 'react-bootstrap';

interface Props {
    show: boolean;
    handleClose: () => void;
    handleDelete: (e: MouseEvent<HTMLButtonElement>) => void;
}

const DeleteModal = ({ show, handleClose, handleDelete }: Props) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Author?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this author?</p>
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
                    >
                        Delete
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default DeleteModal;
