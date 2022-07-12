import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ViewTranslationModal = ({ show, handleClose, selectedData }) => {
    return <Modal
        isOpen={show}
    >
        <ModalHeader toggle={handleClose}>
        Translation Details
        </ModalHeader>
        <ModalBody>
            <div className='mt-2 mb-3'>
                <h5>Input Text</h5>
                <p className='text-secondary'>
                    {selectedData?.inputText}
                </p>
            </div>
            <div className='mb-3'>
                <h5>Output Text</h5>
                <p className='text-secondary'>
                    {selectedData?.outputText}
                </p>
            </div>
        </ModalBody>
        <ModalFooter>
            <Button onClick={handleClose}>
                Close
            </Button>
        </ModalFooter>
    </Modal>
};

export default ViewTranslationModal;
