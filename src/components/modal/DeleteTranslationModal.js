import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const DeleteTranslationModal = ({ show, handleClose, selectedData, handleUpdateList }) => {
    const { addToast } = useToasts();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log(selectedData)
        try {

            const response = await Axios.delete(API_URL + `/delete/${selectedData?.id}`, {
                headers: {
                    'Content-Type': "application/json"
                }
            })
            if (response?.data) {
                addToast('Traslation Deleted Successfully', { appearance: 'success' });
                handleUpdateList('delete', selectedData);
                handleModalClose();
                setLoading(false)
            }

        } catch (error) {
            setLoading(false)
            setError("An error occur! Try again later")
        }
    }

    // Close modal window and clear error
    const handleModalClose = () => {
        setError("")
        handleClose();
    }

    return <Modal
        isOpen={show}
    >
        <ModalHeader toggle={handleModalClose}>
            Translation
        </ModalHeader>
        <ModalBody>
            <h3 className='fs-5 mb-4'>Delete Translation</h3>
            <p className=''>
                Are you sure you want to delete this translation?
            </p>

            {error && <p className='text-center pt-3 text-danger'>{error}</p>}

        </ModalBody>
        <ModalFooter>
            <Button
                disabled={loading}
                color="danger"
                onClick={handleDelete}
            >
                {loading ? "Processing..." : "Yes, Delete"}
            </Button>
            {' '}
            <Button onClick={handleModalClose}>
                Cancel
            </Button>
        </ModalFooter>
    </Modal>
};

export default DeleteTranslationModal;
