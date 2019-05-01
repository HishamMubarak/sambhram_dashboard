import React, { Component } from 'react'
import { Container, Row, Col, Collapse, Table, Button } from 'reactstrap';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import axios from 'axios'
import CustomModal from '../Components/CustomModal'

const initialState = {
    showEditStudentForm:false,
    showEditSubjectForm: false,
    showEnterAllDataAlert: false,
}

class Student extends Component {

    state = { openTab: 0, ...initialState }

    componentDidMount() {
        this.fetchStudentDetails(this.props.match.params.studentId)
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    fetchStudentDetails(studentId) {
        axios.get(`/student/${studentId}`)
            .then(res => {
                this.fetchCourseDetails(res.data.course._id, res.data)
                this.setState({ student: res.data })
            })
            .catch(err => console.log(err))
    }

    fetchCourseDetails(courseId, student) {
        axios.get(`/course/${courseId}`)
            .then(res => {

                let course = res.data[0]
                let semesterSubjectArray = {}

                course.subjects.forEach(each => {
                    if (semesterSubjectArray[each.semester]) {
                        semesterSubjectArray[each.semester].push(each)
                    } else {
                        semesterSubjectArray[each.semester] = [each]
                    }
                })

                this.setState({ course })

                this.combineSubjectAndStudent(semesterSubjectArray, student)

            })
            .catch(err => console.log(err))
    }

    combineSubjectAndStudent(semesterSubjectArray, student) {

        if (!student.subjectData) { student.subjectData = [] }
        const { subjectData } = student

        Object.keys(semesterSubjectArray).map((semNumber, index) => {
            return semesterSubjectArray[semNumber].map((eachSubject, innerIndex) => {
                let foundItem = subjectData.filter(each => each.subjectId === eachSubject._id)
                if (foundItem.length > 0) {
                    return semesterSubjectArray[semNumber][innerIndex].subjectData = foundItem[0]
                } else {
                    return semesterSubjectArray[semNumber][innerIndex].subjectData = {
                        subjectId: eachSubject._id,
                        firstInternal: null,
                        secondInternal: null,
                        attendacePercentage: null
                    }
                }
            })
        })

        this.setState({ subjects: semesterSubjectArray })
    }

    editSubjectDetails() {
        const { editingSubjectId, firstInternal, secondInternal, attendancePercentage } = this.state
        if (editingSubjectId && firstInternal && secondInternal && attendancePercentage) {
            axios.post(`/student/${this.props.match.params.studentId}/updateSubjectData`, {
                editingSubjectId, firstInternal, secondInternal, attendancePercentage
            })
                .then(res => {
                    this.fetchStudentDetails(this.props.match.params.studentId)
                    this.setState({ ...initialState })
                })
                .catch(err => console.log(err))
        } else {
            this.setState({ showEnterAllDataAlert: true })
        }
    }

    editStudentDetails() {
        const { studentId, studentName, mobile, mail, address, registerNumber } = this.state
        if(studentId && studentName && mobile && mail && address && registerNumber) {
            axios.post(`/student/${studentId}`, { name:studentName, mobile, mail, address, registerNumber })
            .then(res => {
                this.fetchStudentDetails(this.props.match.params.studentId)
                this.setState({ ...initialState })
            })
            .catch(err => console.log(err))
        } else {
            this.setState({ showEnterAllDataAlert:true })
        }
    }

    deleteStudent() {
        const { studentId } = this.state
        if(studentId) {
            axios.delete(`/student/${studentId}`)
            .then(res => {
                this.props.history.goBack()
                this.setState({ ...initialState })
            })
            .catch(err => console.log(err))
        } else {
            alert("Error occurred")
        }
    }

    render() {
        const { student } = this.state

        if (this.state.student) {
            return (
                <div>

                    <CustomModal
                        isOpen={this.state.showEditStudentForm}
                        handleInputChange={this.handleInputChange}
                        fields={
                            [
                                { fieldName: "studentName", value: this.state.studentName, placeholder: "Student Name" },
                                { fieldName: "mobile", value: this.state.mobile, placeholder: "Mobile" },
                                { fieldName: "mail", value: this.state.mail, placeholder: "E-Mail" },
                                { fieldName: "address", value: this.state.address, placeholder: "Address" },
                                { fieldName: "registerNumber", value: this.state.registerNumber, placeholder: "Register Number" }
                            ]
                        }
                        showEnterAllDataAlert={this.state.showEnterAllDataAlert}
                        onSubmit={() => this.editStudentDetails()}
                        showDeleteButton={this.state.showEditStudentForm}
                        onDelete={() => this.deleteStudent() }
                        onCancel={() => this.setState({ ...initialState })}
                    />

                    <CustomModal
                        isOpen={this.state.showEditSubjectForm}
                        handleInputChange={this.handleInputChange}
                        fields={
                            [
                                { fieldName: "firstInternal", value: this.state.firstInternal, placeholder: "First Internal Marks", type: "number" },
                                { fieldName: "secondInternal", value: this.state.secondInternal, placeholder: "Second Internal Marks", type: "number" },
                                { fieldName: "attendancePercentage", value: this.state.attendancePercentage, placeholder: "Attendance Percentage", type: "number" }
                            ]
                        }
                        showEnterAllDataAlert={this.state.showEnterAllDataAlert}
                        onSubmit={() => this.editSubjectDetails()}
                        onCancel={() => this.setState({ ...initialState })}
                    />

                    <Container>
                        <Row style={{ marginTop: 50, marginBottom: 50 }}>
                            <Col>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col sm="6">
                                                <CardTitle>{student.name}</CardTitle>
                                                <CardText>{student.registerNumber}</CardText>
                                                <CardText>{student.course.name}</CardText>
                                                <CardText>{student.batch.name} {student.course.name}</CardText>
                                            </Col>
                                            <Col sm="6">
                                                <CardText>{student.mobile}</CardText>
                                                <CardText>{student.address}</CardText>
                                                <CardText>{student.mail}</CardText>
                                            </Col>
                                        </Row>
                                        <Row style={{ margin: 10, marginTop: 20 }}>
                                            <Button color="primary" onClick={ () => {
                                                this.setState({
                                                    studentId:student._id,
                                                    studentName:student.name,
                                                    mobile:student.mobile,
                                                    mail:student.mail,
                                                    address:student.address,
                                                    registerNumber:student.registerNumber
                                                }, () => this.setState({ showEditStudentForm:true }))
                                            }}>Edit Detail</Button>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            {
                                this.state.subjects && Object.keys(this.state.subjects).length > 0 &&
                                Object.keys(this.state.subjects).map((key, index) => {
                                    const subjects = this.state.subjects[key]
                                    return (
                                        <Col sm="12" key={key}>
                                            <Button onClick={() => this.setState(this.state.openTab === index ? { openTab: -1 } : { openTab: index })}
                                                size="lg" outline color="primary" block>Semester : {key}</Button>

                                            <Collapse isOpen={this.state.openTab === index}>
                                                <Card>
                                                    <Row>
                                                        {
                                                            subjects && subjects.length > 0 &&
                                                            <Col>
                                                                <Table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>No</th>
                                                                            <th>Subject Name</th>
                                                                            <th>1st Internal</th>
                                                                            <th>2nd Internal</th>
                                                                            <th>Attendance</th>
                                                                            <th>Actions</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            subjects.map((each, index) => {
                                                                                // console.log(each)
                                                                                return (
                                                                                    <tr key={each._id}>
                                                                                        <td>{index + 1}</td>
                                                                                        <td>{each.name}</td>
                                                                                        <td>{each.subjectData.firstInternal || 'NA'}</td>
                                                                                        <td>{each.subjectData.secondInternal || 'NA'}</td>
                                                                                        <td>{each.subjectData.attendancePercentage || 'NA'}</td>
                                                                                        <td>
                                                                                            <Button color="primary" onClick={() => this.setState({
                                                                                                editingSubjectId: each._id,
                                                                                                firstInternal: each.subjectData.firstInternal,
                                                                                                secondInternal: each.subjectData.secondInternal,
                                                                                                attendancePercentage: each.subjectData.attendancePercentage,
                                                                                                showEditSubjectForm: true
                                                                                            })}>Edit</Button>
                                                                                        </td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        }

                                                                    </tbody>
                                                                </Table>
                                                            </Col>
                                                        }
                                                    </Row>
                                                </Card>
                                            </Collapse>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Container>
                </div>
            )
        } else {
            return <p>Loading</p>
        }
    }
}

export default Student