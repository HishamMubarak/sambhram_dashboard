import React, { Component } from 'react'
import axios from 'axios'
import { Container, Row, Col, Collapse, Table, Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert  } from 'reactstrap';
import { connect } from 'react-redux' 
import { Link } from 'react-router-dom'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

class Departments extends Component {

    state = { openTab:0 }
    render() {
        return (
            <div>
                <Container>
                    <Row style={{ marginTop:50, marginBottom:50 }}>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col sm="6">
                                            <CardTitle>Hisham Mubarak</CardTitle>
                                            <CardText>15XWSB7040</CardText>
                                            <CardText>6th Sem, BCA, CS</CardText>
                                        </Col>
                                        <Col sm="6">
                                            <CardText>9744891011</CardText>
                                            <CardText>Malappuram, Kerala</CardText>
                                            <CardText>parengalhisham@gmail.com</CardText>
                                        </Col>
                                    </Row>
                                    <Row style={{ margin:10, marginTop:20 }}>
                                        <Button color="primary">Edit Detail</Button>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12">
                            <Button onClick={ () => this.setState(this.state.openTab === 0 ? { openTab:-1 } :  { openTab:0 }) } size="lg" outline color="primary" block>Semester 6</Button>
                            <Collapse isOpen={0 === this.state.openTab}>
                                <Card>
                                    <Row>
                                        <Col>
                                            <Button color="link" onClick={ () => console.log("Implement Edit Form") }>Edit</Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Subject</th>
                                                        <th>Internal 1 (50)</th>
                                                        <th>Internal 2 (50)</th>
                                                        <th>Theory</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{1}</td>
                                                        <td>Cryptography & Network Security</td>
                                                        <td>25</td>
                                                        <td>35</td>
                                                        <td>57</td>
                                                        <td>
                                                            <Button color="link" onClick={ () => console.log("Implement Edit Form") }>Edit</Button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>{1}</td>
                                                        <td>Cryptography & Network Security</td>
                                                        <td>25</td>
                                                        <td>35</td>
                                                        <td>57</td>
                                                        <td>
                                                            <Button color="link" onClick={ () => console.log("Implement Edit Form") }>Edit</Button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </Card>
                            </Collapse>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Departments