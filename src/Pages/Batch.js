import React, { Component } from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Button, Card, CardBody, CardText, CardTitle } from 'reactstrap';
import CustomModal from '../Components/CustomModal'
import { Link } from 'react-router-dom'

const initialState = {
    studentName: null, mobile: null, mail: null, address: null, registerNumber: null,
    showAddStudentForm: false,
    showEnterAllDataAlert: false,
    showNotificationModal: false,
    notificationTitle: null,
    notificationText: null
}

class Batch extends Component {

    state = { batchData: null, students: null, ...initialState }

    componentDidMount() {
        this.fetchBatchDetailsAndStudents(this.props.match.params.batchId)
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    sendBatchNotification() {
        const { notificationText, notificationTitle } = this.state
        if (notificationText && notificationTitle) {
            axios.post('/notification', {
                title: notificationTitle,
                description: notificationText,
                batchId: this.props.match.params.batchId
            })
                .then(res => this.setState({ ...initialState }))
                .catch(err => console.log(err))
        } else {
            this.setState({ showEnterAllDataAlert: true })
        }
    }

    fetchBatchDetailsAndStudents(batchId) {
        axios.get(`/batch/${batchId}`)
            .then(res => {
                this.setState({ batchData: res.data.batchData[0], students: res.data.students })
            })
            .catch(err => console.log(err))
    }

    addStudent() {
        const { studentName, mobile, mail, address, registerNumber } = this.state
        if (mobile && mobile.length !== 10) {
            alert("Enter 10 digit mobile number")
        } else if (studentName && mobile && mail && address && registerNumber) {

            const department = this.state.batchData.department[0]._id
            const course = this.state.batchData.course[0]._id
            const batch = this.state.batchData._id

            axios.put('/student', {
                department, course, batch,
                name: studentName,
                mobile, mail, address, registerNumber
            })
                .then(res => {
                    this.setState((currentState) => {
                        currentState.students.push(res.data)
                        return { students: currentState.students, ...initialState }
                    })
                })
                .catch(err => console.log(err))
        } else {
            this.setState({ showEnterAllDataAlert: true })
        }
    }


    render() {
        if (this.state.batchData) {
            return (
                <>
                    <CustomModal
                        isOpen={this.state.showAddStudentForm}
                        handleInputChange={this.handleInputChange}
                        fields={
                            [
                                { fieldName: "studentName", value: this.state.studentName, placeholder: "Student Name" },
                                { fieldName: "mobile", value: this.state.mobile, placeholder: "Mobile", type:"number" },
                                { fieldName: "mail", value: this.state.mail, placeholder: "E-Mail" },
                                { fieldName: "address", value: this.state.address, placeholder: "Address" },
                                { fieldName: "registerNumber", value: this.state.registerNumber, placeholder: "Register Number" }
                            ]
                        }
                        showEnterAllDataAlert={this.state.showEnterAllDataAlert}
                        onSubmit={() => this.addStudent()}
                        onCancel={() => this.setState({ ...initialState })}
                    />

                    <CustomModal
                        isOpen={this.state.showNotificationModal}
                        handleInputChange={this.handleInputChange}
                        fields={
                            [
                                { fieldName: "notificationTitle", value: this.state.notificationTitle, placeholder: "Notification Title" },
                                { fieldName: "notificationText", value: this.state.notificationText, placeholder: "Notification Body" }
                            ]
                        }
                        showEnterAllDataAlert={this.state.showEnterAllDataAlert}
                        onSubmit={() => this.sendBatchNotification()}
                        onCancel={() => this.setState({ ...initialState })}
                    />

                    <Container>
                        <Row style={{ marginTop: 50, marginBottom: 50 }}>
                            <Col>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col sm="12">
                                                <CardTitle>Department : {this.state.batchData.department[0].name}</CardTitle>
                                                <CardText>Course : {this.state.batchData.course[0].name}</CardText>
                                                <CardText>Batch : {this.state.batchData.name}</CardText>
                                            </Col>
                                        </Row>
                                        <Row style={{ margin: 10, marginTop: 20 }}>
                                            <Button color="primary" style={{ margin: 10 }} onClick={() => this.setState({ showAddStudentForm: true })}>Add Student</Button>
                                            <Button color="primary" style={{ margin: 10 }} onClick={() => this.setState({ showNotificationModal: true })}>Send Batch Notification</Button>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {
                                    this.state.students && this.state.students.length > 0 &&
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Name</th>
                                                <th>Register Numer</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.students.map((each, index) => {
                                                    return (
                                                        <tr key={each._id}>
                                                            <td>{index + 1}</td>
                                                            <td>{each.name}</td>
                                                            <td>{each.registerNumber}</td>
                                                            <td>
                                                                <Link to={`/student/${each._id}`} style={{ textDecoration: 'none', color: 'white' }}>
                                                                    <Button color="link">Details</Button>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                }
                            </Col>
                        </Row>
                    </Container>
                </>
            )
        } else {
            return (
                <p style={{ textAlign: 'center' }}>Fetching data....</p>
            )
        }

    }
}

export default Batch