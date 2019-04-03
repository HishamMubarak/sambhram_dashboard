import React from 'react'
import { Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Container, Row, Col, Alert, Button } from 'reactstrap'

const CustomModal = (props) => {
    return (
        <Modal isOpen={props.isOpen}>
            <ModalBody>
                <Form>
                    {
                        props.fields.map(each => {
                            return (
                                <FormGroup key={each.fieldName}>
                                    <Label for={each.fieldName}>Enter {each.placeholder}</Label>
                                    <Input type={each.type || "text"} name={each.fieldName} onChange={props.handleInputChange} value={each.value || ''} />
                                </FormGroup>
                            )
                        })
                    }
                    {
                        props.selectFields && props.selectFields.map(eachSelect => {
                            return (
                                <FormGroup key={eachSelect.fieldName}>
                                    <Label for={eachSelect.fieldName}>Select</Label>
                                    <Input value={eachSelect.value} type="select" name={eachSelect.fieldName} id={eachSelect.fieldName} onChange={props.handleInputChange}>
                                        {
                                            eachSelect.data.map((each) => {
                                                return (<option key={each._id} value={each._id}>{each.name}</option>)
                                            })
                                        }
                                    </Input>
                                </FormGroup>
                            )
                        })

                    }
                </Form>
            </ModalBody>
            <ModalFooter>
                <Container>
                    <Row>
                        <Col>
                            <Alert isOpen={props.showEnterAllDataAlert} color="danger">Enter all data before submitting</Alert>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button color="primary" block onClick={props.onSubmit}>Submit</Button>
                            {props.showDeleteButton && <Button color="danger" block onClick={props.onDelete}>Delete</Button>}
                            <Button color="secondary" block onClick={props.onCancel}>Cancel</Button>
                        </Col>
                    </Row>
                </Container>
            </ModalFooter>
        </Modal>
    )
}

export default CustomModal