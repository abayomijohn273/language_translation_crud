import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import Axios from "axios";
import { useToasts } from 'react-toast-notifications';

const API_URL = process.env.REACT_APP_API_URL;

const CreateTranslationModal = ({ show, handleClose, handleUpdateList }) => {
    const { addToast } = useToasts();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        inputText: "",
        outputText: ""
    });
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        setError("");

        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true)
    
        try {
            const { inputText, outputText } = data;
            if (!inputText || !outputText) {
                setError("Make sure the fields is not empty")
                return;
            }
            const payload = {
                inputText,
                outputText
            }

            const response = await Axios.post(API_URL, payload, {
                headers: {
                    'Content-Type': "application/json"
                }
            })
            if(response?.data){
                addToast('Traslation Saved Successfully', { appearance: 'success' });
                handleUpdateList('create', response?.data);
                handleModalClose();
                setLoading(false)
            }
           
        } catch (error) {
            setLoading(false)
            setError("An error occur! Try again later")
        }
    }

    // Close modal window and clear form field value
    const handleModalClose = () => {
        setData({
            inputText: "",
            outputText: ""
        })
        setError("")
        handleClose();
    }

    return <Modal
        isOpen={show}
    >
        <ModalHeader toggle={handleModalClose}>
            Translation
        </ModalHeader>
        <Form inline>
            <ModalBody className="pt-4 pb-5">
                <h3 className='fs-5 mb-4'>Create New Translation</h3>

                <FormGroup floating>
                    <Input
                        name="inputText"
                        placeholder="Input Text"
                        type="text"
                        value={data.inputText}
                        onChange={handleInputChange}
                    />
                    <Label for="inputText">
                        Input Text
                    </Label>
                </FormGroup>
                {' '}
                <FormGroup floating>
                    <Input
                        name="outputText"
                        placeholder="Output Text"
                        type="text"
                        value={data.outputText}
                        onChange={handleInputChange}
                    />
                    <Label for="outputText">
                        Output Text
                    </Label>
                </FormGroup>

                {error && <p className='text-center pt-3 text-danger'>{error}</p>}
            </ModalBody>
            <ModalFooter>
                <Button
                    disabled={loading}
                    type="submit"
                    color="primary"
                    onClick={onSubmit}
                >
                    {loading ? "Processing..." : "Submit"}
                </Button>
                {' '}
                <Button onClick={handleModalClose}>
                    Cancel
                </Button>
            </ModalFooter>
        </Form>
    </Modal>
};

export default CreateTranslationModal;
