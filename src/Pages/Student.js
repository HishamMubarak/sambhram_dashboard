import React, { Component } from 'react'
import { Container, Row, Col, Collapse, Table, Button } from 'reactstrap';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import axios from 'axios'

class Student extends Component {

    state = { openTab: 0 }

    componentDidMount() {
        this.fetchStudentDetails(this.props.match.params.studentId)
    }

    fetchStudentDetails(studentId) {
        axios.get(`/student/${studentId}`)
            .then(res => {
                this.fetchCourseDetails(res.data.course._id)
                this.setState({ student: res.data })
            })
            .catch(err => console.log(err))
    }

    fetchCourseDetails(courseId) {
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

                this.setState({ course, subjects: semesterSubjectArray })

            })
            .catch(err => console.log(err))
    }

    render() {
        const { student } = this.state

        if (this.state.student) {
            return (
                <div>
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
                                            <Button color="primary">Edit Detail</Button>
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
                                                                            <th>Actions</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            subjects.map((each, index) => {
                                                                                return (
                                                                                    <tr key={each._id}>
                                                                                        <td>{index + 1}</td>
                                                                                        <td>{each.name}</td>
                                                                                        <td>
                                                                                            <Button color="primary" onClick={() => this.setState({ subjectName: each.name, subjectId: each._id, subjectSemester: key, showEditSubjectForm: true })}>Edit</Button>
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