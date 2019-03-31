import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom'

class Home extends Component {
    render() {
        return(
            <Container style={{ marginTop:50 }}>
                <Row>
                    <Col>
                        <h2 style={{ textAlign:'center' }}>Computer Science Department</h2>
                    </Col>
                </Row>
                <Row style={{ marginTop:25, marginBottom:25 }}>
                    
                    <Col sm="12">
                        <Row style={{ margin:10 }}> 
                            <Col sm="9">
                                <h3>MCA</h3>
                            </Col>
                            <Col sm="3">
                                <Button color="primary" block>Add New Batch</Button>
                            </Col>
                        </Row>
                    </Col>
                    
                    <Col sm="4">
                        <Card>
                            <CardBody>
                                <CardTitle>15 Series</CardTitle>
                                <CardSubtitle>Total Students : 50</CardSubtitle>
                                {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
                                <Link style={{ textDecoration: 'none', color: 'white' }} to="/batch" ><Button color="primary">Details</Button></Link>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col sm="4">
                        <Card>
                            <CardBody>
                                <CardTitle>16 Series</CardTitle>
                                <CardSubtitle>Total Students : 50</CardSubtitle>
                                {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
                                <Button color="primary">Details</Button>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="4">
                        <Card>
                            <CardBody>
                                <CardTitle>17 Series</CardTitle>
                                <CardSubtitle>Total Students : 50</CardSubtitle>
                                {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
                                <Button color="primary">Details</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <hr />

                <Row style={{ marginTop:25, marginBottom:25 }}>
                    <Col sm="12">
                        <div>
                            <h3>BCA</h3>
                        </div>
                    </Col>
                    <Col sm="4">
                        <Card>
                            <CardBody>
                                <CardTitle>15 Series</CardTitle>
                                <CardSubtitle>Total Students : 50</CardSubtitle>
                                {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
                                <Button color="primary">Details</Button>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col sm="4">
                        <Card>
                            <CardBody>
                                <CardTitle>16 Series</CardTitle>
                                <CardSubtitle>Total Students : 50</CardSubtitle>
                                {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
                                <Button color="primary">Details</Button>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="4">
                        <Card>
                            <CardBody>
                                <CardTitle>17 Series</CardTitle>
                                <CardSubtitle>Total Students : 50</CardSubtitle>
                                {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
                                <Button color="primary">Details</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home