import React, { Component } from 'react'
import axios from 'axios'
import { Container, Row, Col, Collapse, Table, Button, Card, CardBody, CardTitle } from 'reactstrap';
import CustomModal from '../Components/CustomModal'

const initialState = {
  showEnterAllDataAlert: false,
  showEditCourseForm: false,
  courseName: null,
  showAddSubjectForm: null,
  subjectName: null,
  subjectSemester: null,
  showEditSubjectForm: null
}


class Course extends Component {

  state = { course: null, openTab: -1, ...initialState }

  componentDidMount() {
    this.fetchCourseDetails(this.props.match.params.courseId)
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
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

  editCourse() {
    if (this.state.courseName && this.state.courseId) {
      axios.post(`/course/${this.state.courseId}`, { name: this.state.courseName })
        .then(res => {
          this.fetchCourseDetails(this.props.match.params.courseId)
          this.setState({ ...initialState })
          // let departmentIndex = null
          // this.state.departments.forEach((each, index) => {
          //   if (each._id === res.data.department) departmentIndex = index
          // });

          // let courseIndex = null
          // this.state.departments[departmentIndex].courses.forEach((each, index) => {
          //   if (each._id === res.data._id) courseIndex = index
          // })

          // this.setState((oldState) => {
          //   oldState.departments[departmentIndex].courses[courseIndex].name = res.data.name
          //   return { departments: oldState.departments, ...initialState }
          // })
        })
        .catch(err => console.log(err))
    } else {
      this.setState({ showEnterAllDataAlert: true })
    }
  }

  deleteCourse() {
    if (this.props.match.params.courseId) {
      axios.delete(`/course/${this.props.match.params.courseId}`)
        .then(res => {
          this.props.history.goBack()

          // let departmentIndex = null
          // this.state.departments.forEach((each, index) => {
          //   if (each._id === res.data.department) departmentIndex = index
          // });

          // let updatedCoursesList = this.state.departments[departmentIndex].courses.filter((each, index) => {
          //   return each._id !== res.data._id
          // })

          // this.setState((oldState) => {
          //   oldState.departments[departmentIndex].courses = updatedCoursesList
          //   return { departments: oldState.departments, ...initialState }
          // })

        })
        .catch(err => console.log(err))
    }
  }

  addSubject() {
    const { subjectName, subjectSemester } = this.state
    if (subjectName && subjectSemester) {
      axios.put(`/subject`, { name: subjectName, semester: subjectSemester, course: this.props.match.params.courseId })
        .then(res => {
          this.fetchCourseDetails(this.props.match.params.courseId)
          this.setState({ ...initialState })
        })
        .catch(err => console.log(err))
    } else {
      this.setState({ showEnterAllDataAlert: true })
    }
  }

  editSubject() {
    const { subjectName, subjectSemester, subjectId } = this.state
    if (subjectName && subjectSemester && subjectId) {
      axios.post(`/subject/${subjectId}`, { name: subjectName, semester: subjectSemester })
        .then(res => {
          this.fetchCourseDetails(this.props.match.params.courseId)
          this.setState({ ...initialState })
        })
        .catch(err => console.log(err))
    } else {
      this.setState({ showEnterAllDataAlert: true })
    }
  }

  deleteSubject() {
    const { subjectId } = this.state
    if (subjectId) {
      axios.delete(`/subject/${subjectId}`)
        .then(res => {
          this.fetchCourseDetails(this.props.match.params.courseId)
          this.setState({ ...initialState })
        })
        .catch(err => console.log(err))
    } else {
      this.setState({ showEnterAllDataAlert: true })
    }
  }

  render() {
    if (this.state.course) {
      const { course } = this.state
      return (
        <>
          <CustomModal
            isOpen={this.state.showEditCourseForm}
            handleInputChange={this.handleInputChange}
            fields={
              [
                { fieldName: "courseName", value: this.state.courseName, placeholder: "Course Name" }
              ]
            }
            showDeleteButton={this.state.showEditCourseForm}
            showEnterAllDataAlert={this.state.showEnterAllDataAlert}
            onSubmit={() => this.editCourse()}
            onDelete={() => this.deleteCourse()}
            onCancel={() => this.setState({ ...initialState })}
          />

          <CustomModal
            isOpen={this.state.showAddSubjectForm}
            handleInputChange={this.handleInputChange}
            fields={
              [
                { fieldName: "subjectName", value: this.state.subjectName, placeholder: "Subject Name" },
                { fieldName: "subjectSemester", value: this.state.subjectSemester, placeholder: "Semester", type: "number" }
              ]
            }
            showEnterAllDataAlert={this.state.showEnterAllDataAlert}
            onSubmit={() => this.addSubject()}
            onCancel={() => this.setState({ ...initialState })}
          />

          <CustomModal
            isOpen={this.state.showEditSubjectForm}
            handleInputChange={this.handleInputChange}
            fields={
              [
                { fieldName: "subjectName", value: this.state.subjectName, placeholder: "Subject Name" },
                { fieldName: "subjectSemester", value: this.state.subjectSemester, placeholder: "Semester", type: "number" }
              ]
            }
            showDeleteButton={this.state.showEditSubjectForm}
            showEnterAllDataAlert={this.state.showEnterAllDataAlert}
            onSubmit={() => this.editSubject()}
            onDelete={() => this.deleteSubject()}
            onCancel={() => this.setState({ ...initialState })}
          />

          <Container>
            <Row style={{ marginTop: 50, marginBottom: 50 }}>
              <Col>
                <Card>
                  <CardBody>
                    <Row>
                      <Col sm="12">
                        <CardTitle>{course.name}</CardTitle>
                      </Col>
                    </Row>
                    <Row style={{ margin: 10, marginTop: 20 }}>
                      <Button style={{ margin: 10 }} onClick={() => this.setState({ subjectName: '', subjectSemester: null, showAddSubjectForm: true })} color="primary">Add Subject</Button>{}
                      <Button color="primary" style={{ margin: 10 }} onClick={() => this.setState({ courseId: course._id, courseName: course.name, showEditCourseForm: true })}>Edit</Button>
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
        </>
      )
    } else {
      return <p>Loading...</p>
    }
  }
}


export default Course