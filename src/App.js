import logo from './logo.svg';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, } from 'reactstrap';
import './App.css';
import Header from './components/Header';
import TranslationTable from './components/TranslationTable';
import { useState } from 'react';
import CreateTranslationModal from './components/modal/CreateTranslationModal';
import EditTranslationModal from './components/modal/EditTranslationModal';
import DeleteTranslationModal from './components/modal/DeleteTranslationModal';
import { useEffect } from 'react';
import Axios from "axios";
import ViewTranslationModal from './components/modal/ViewTranslationModal';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
    const [loading, setLoading] = useState(false);
    const [translationList, setTranslationList] = useState([]);
    const [show, setShow] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedData, setSelectedData] = useState({});

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await Axios.get(API_URL, {
                headers: {
                    'Content-Type': "application/json"
                }
            })

            setTranslationList(response?.data || []);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            throw Error(error);
        }
    }


    // Open create modal
    const handleShow = () => {
        setShow(true);
    }

    // Close create modal
    const handleClose = () => {
        setShow(false)
    }

    // Open view single details modal
    const handleShowViewModal = (data) => {
        setSelectedData(data)
        setShowView(true);
    }

    // Close view single details modal
    const handleCloseViewModal = () => {
        setSelectedData({})
        setShowView(false);
    }

    // Open edit modal
    const handleShowEditModal = (data) => {
        setSelectedData(data)
        setShowEdit(true);
    }

    // Close edit modal
    const handleCloseEditModal = () => {
        setSelectedData({})
        setShowEdit(false);
    }

    // Open delete modal
    const handleShowDeleteModal = (data) => {
        setSelectedData(data)
        setShowDelete(true);
    }

    // Close delete modal
    const handleCloseDeleteModal = () => {
        setSelectedData({})
        setShowDelete(false);
    }

    // Update List
    const handleUpdateList = (method, data) => {
        switch (method) {
            case 'create':
                setTranslationList([...translationList, data]);
                break;
            case 'edit':
                setTranslationList(translationList?.map(a => a?.id === data?.id ? {
                    ...data
                } : {
                    ...a
                }))
                break;
            case 'delete':
                setTranslationList(translationList?.filter(a => a?.id !== data?.id));
                break;
            default:
                return;
        }

    }

    return (
        <main>
            <Header />

            <Container className="pt-3 pt-lg-4">
                <Row>
                    <Col className="d-flex flex-row justify-content-md-end">
                        <Button
                            color="primary align-self-end"
                            onClick={handleShow}
                        >
                            Create New Translation
                        </Button>
                    </Col>
                </Row>
            </Container>
            <TranslationTable
                loading={loading}
                translationList={translationList}
                handleShowEditModal={handleShowEditModal}
                handleShowDeleteModal={handleShowDeleteModal}
                handleShowViewModal={handleShowViewModal}
            />

            <ViewTranslationModal
                show={showView}
                handleClose={handleCloseViewModal}
                selectedData={selectedData}
            />

            <CreateTranslationModal
                show={show}
                handleClose={handleClose}
                handleUpdateList={handleUpdateList}
            />

            <EditTranslationModal
                show={showEdit}
                handleClose={handleCloseEditModal}
                selectedData={selectedData}
                handleUpdateList={handleUpdateList}
            />

            <DeleteTranslationModal
                show={showDelete}
                handleClose={handleCloseDeleteModal}
                selectedData={selectedData}
                handleUpdateList={handleUpdateList}
            />
        </main>
    );
}

export default App;
