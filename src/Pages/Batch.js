import React, { Component } from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert  } from 'reactstrap';
import { connect } from 'react-redux' 
import { Link } from 'react-router-dom'

class Departments extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th style={{ width:'50%' }}>Name</th>
                                        <th>Attendance</th>
                                        <th>Mobile</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{1}</td>
                                        <td>Hisham Mubarak</td>
                                        <td>86%</td>
                                        <td>9744891011</td>
                                        <td>
                                            <Link to="/student" style={{ textDecoration:'none', color:'white' }}>
                                                <Button color="link">Details</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Departments