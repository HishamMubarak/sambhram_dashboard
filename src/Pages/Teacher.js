import React, { Component } from 'react'
import { Container, Row, Col, Table, Button } from 'reactstrap';

class Teacher extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col style={{ padding:20 }}>
                            <Button color="primary" onClick={ () => console.log("Implement Edit Form") }>Add New Teacher</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Name</th>
                                        <th>Department</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{1}</td>
                                        <td>Sophia Margot</td>
                                        <td>Computer Science</td>
                                        <td>
                                            <Button color="link" onClick={ () => console.log("Implement Edit Form") }>Edit</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{1}</td>
                                        <td>Shathru</td>
                                        <td>Commerce</td>
                                        <td>
                                            <Button color="link" onClick={ () => console.log("Implement Edit Form") }>Edit</Button>
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

export default Teacher