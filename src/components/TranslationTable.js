import React from 'react';
import { Container, Row, Col, Table, Button, Spinner } from 'reactstrap';

const TableHeader = () => {
    return <thead>
        <tr>
            <th>
                #
            </th>
            <th>
                Input Text
            </th>
            <th>
                Output Text
            </th>
        </tr>
    </thead>
}

const TableBody = ({ data = [], handleShowEditModal, handleShowDeleteModal, handleShowViewModal }) => {
    return <tbody>
        {
            data?.map(datum => <tr key={datum?.id}>
                <th scope="row">
                    {datum?.id}
                </th>
                <td>
                    {datum?.inputText}
                </td>
                <td>
                    {datum?.outputText}
                </td>
                <td className='d-flex'>
                    <Button
                        color="primary"
                        size="sm"
                        className=""
                        onClick={() => handleShowViewModal(datum)}
                    >
                        View
                    </Button>
                    <p className='px-2' />
                    <Button
                        color="warning"
                        size="sm"
                        className=""
                        onClick={() => handleShowEditModal(datum)}
                    >
                        Edit
                    </Button>
                    <p className='px-2' />
                    <Button
                        color="danger"
                        size="sm"
                        className=""
                        onClick={() => handleShowDeleteModal(datum)}
                    >
                        Delete
                    </Button>
                </td>
            </tr>)
        }

    </tbody>
}

const TranslationTable = ({
    loading,
    translationList,
    handleShowEditModal,
    handleShowDeleteModal,
    handleShowViewModal
}) => {
    return <Container className="pt-5">
        <Row>
            <Col>
                <h2 class="fs-6 fs-lg-4 mb-3">Translation List</h2>

                {
                    loading ?
                        <div className='d-flex justify-content-center py-5'>
                            <Spinner>
                                loading...
                            </Spinner>
                        </div>
                        : translationList?.length === 0 ?
                            <div className='d-flex justify-content-center text-center py-5'>
                                <p>No Record Return.</p>
                            </div>
                            :
                            <Table className="align-middle table-responsive" responsive>
                                <TableHeader />
                                <TableBody
                                    data={translationList}
                                    handleShowEditModal={handleShowEditModal}
                                    handleShowDeleteModal={handleShowDeleteModal}
                                    handleShowViewModal={handleShowViewModal}
                                />
                            </Table>
                }

            </Col>
        </Row>
    </Container>;
};

export default TranslationTable;
