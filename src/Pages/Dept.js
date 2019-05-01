import React, { Component } from 'react'
import axios from 'axios'
import { Container, Row, Col, Collapse, Card, Table, Button } from 'reactstrap';
import CustomModal from '../Components/CustomModal'
import { Link } from 'react-router-dom'

const initialState = {
    deptId: null,
    departmentName: '',
    showAddDeptForm: false,
    showEditDeptForm: false,
    showEnterAllDataAlert: false,
    showAddCourseForm: false,
    showEditCourseForm: false,
}

class Department extends Component {

    state = { departments: '', ...initialState, openTab:0 }

    componentDidMount() {
        this.fetchDepartments()
    }

    fetchDepartments() {
        axios.get('/department')
            .then(res => {
                this.setState({ departments: res.data })
            })
            .catch(err => console.log(err))
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    addDept() {
        if (this.state.departmentName) {
            axios.put('/department', { name: this.state.departmentName })
                .then(res => this.setState({ departments: this.state.departments.concat(res.data), ...initialState }))
                .catch(err => {
                    alert("Server error. Please try again later")
                    console.log(err)
                })
        } else {
            this.setState({ showEnterAllDataAlert: true })
        }
    }

    editDept() {
        if (this.state.departmentName) {
            axios.post(`/department/${this.state.deptId}`, { name: this.state.departmentName })
                .then(res => {
                    // let itemIndex = null

                    // this.state.departments.forEach((each, index) => {
                    //     if(each._id === res.data._id) itemIndex = index 
                    // });
                    this.fetchDepartments()
                    this.setState({ ...initialState })
                    // this.setState((oldState) => {
                    //     oldState.departments[itemIndex].name = res.data.name
                    //     return {
                    //         departments:oldState.departments,
                    //         ...initialState
                    //     }
                    // })
                })
                .catch(err => {
                    alert("Server error. Please try again later")
                    console.log(err)
                })
        } else {
            this.setState({ showEnterAllDataAlert: true })
        }
    }

    deleteDept() {
        if (this.state.deptId) {
            axios.delete(`/department/${this.state.deptId}`)
                .then(res => {
                    this.setState({
                        departments: this.state.departments.filter(each => each._id !== res.data._id),
                        ...initialState
                    })
                })
                .catch(err => console.log(err))
        } else {
            alert("Error occurred")
        }
    }

    addCourse() {
        if (this.state.deptId && this.state.courseName) {
            axios.put('/course', { department: this.state.deptId, name: this.state.courseName })
                .then(res => {
                    this.fetchDepartments()
                    this.setState({ ...initialState })
                    // let itemIndex = null
                    // this.state.departments.forEach((each, index) => {
                    //     if(each._id === res.data.department) itemIndex = index 
                    // });

                    // this.setState((oldState) => {
                    //     oldState.departments[itemIndex].courses.length > 0 ? 
                    //         oldState.departments[itemIndex].courses.push(res.data)
                    //     :
                    //         oldState.departments[itemIndex].courses = [res.data]

                    //     return { departments:oldState.departments, ...initialState }
                    // })

                })
                .catch(err => console.log(err))
        } else {
            this.setState({ showEnterAllDataAlert: true })
        }
    }

    render() {
        return (
            <div style={{ marginTop:100 }}>

                <CustomModal
                    isOpen={this.state.showAddDeptForm}
                    handleInputChange={this.handleInputChange}
                    fields={
                        [
                            { fieldName: "departmentName", value: this.state.departmentName, placeholder: "Department Name" }
                        ]
                    }
                    showEnterAllDataAlert={this.state.showEnterAllDataAlert}
                    onSubmit={() => this.addDept()}
                    onCancel={() => this.setState({ ...initialState })}
                />

                <CustomModal
                    isOpen={this.state.showEditDeptForm}
                    handleInputChange={this.handleInputChange}
                    fields={
                        [
                            { fieldName: "departmentName", value: this.state.departmentName, placeholder: "Department Name" }
                        ]
                    }
                    showDeleteButton={this.state.showEditDeptForm}
                    onDelete={() => this.deleteDept()}
                    showEnterAllDataAlert={this.state.showEnterAllDataAlert}
                    onSubmit={() => this.editDept()}
                    onCancel={() => this.setState({ ...initialState })}
                />

                <CustomModal
                    isOpen={this.state.showAddCourseForm}
                    handleInputChange={this.handleInputChange}
                    fields={
                        [
                            { fieldName: "courseName", value: this.state.courseName, placeholder: "Course Name" }
                        ]
                    }
                    showEnterAllDataAlert={this.state.showEnterAllDataAlert}
                    onSubmit={() => this.addCourse()}
                    onCancel={() => this.setState({ ...initialState })}
                />



                <Container>
                    <Row>
                        {this.state.departments && this.state.departments.length > 0 ?
                            this.state.departments.map((each, index) => {
                                return (
                                    <Col key={each._id} sm="12">

                                        <Button
                                            onClick={() => this.setState(this.state.openTab === index ? { openTab: -1 } : { openTab: index })}
                                            size="lg" outline color="primary" block>
                                            {each.name}
                                        </Button>

                                        <Collapse isOpen={index === this.state.openTab}>
                                            <Card style={{ marginBottom: 20 }}>
                                                <Row>
                                                    <Col>
                                                        <Button style={{ margin: 5 }} color="primary" onClick={() => this.setState({ deptId: each._id, courseName: '', showAddCourseForm: true })}>Add New Course</Button>{}
                                                        <Button color="primary" onClick={() => this.setState({ deptId: each._id, departmentName: each.name, showAddDeptForm: false, showEditDeptForm: true })}>Edit</Button>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Table >
                                                            <thead>
                                                                <tr>
                                                                    <th>No</th>
                                                                    <th>Courses</th>
                                                                    <th>Actions</th>
                                                                </tr>
                                                            </thead>

                                                            {
                                                                each.courses && each.courses.length > 0 ?
                                                                    each.courses.map((course, courseIndex) => {
                                                                        return (
                                                                            <tbody key={course._id}>
                                                                                <tr>
                                                                                    <td>{courseIndex + 1}</td>
                                                                                    <td>{course.name}</td>
                                                                                    <td>
                                                                                        <Link style={{ margin: 10, textDecoration: 'none', color: 'white' }} to={`/course/${course._id}`} >
                                                                                            <Button color="primary">Details</Button>
                                                                                        </Link>
                                                                                        {/* <Button color="link" onClick={ () => this.setState({ deptId:each._id, courseId:course._id, courseName:course.name, showEditCourseForm:true }) }>Edit</Button> */}
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>

                                                                        )
                                                                    })
                                                                    :
                                                                    <tbody>
                                                                        <tr>
                                                                            <td><p style={{ textAlign: 'center' }}>No Courses. Add Some.</p></td>
                                                                        </tr>
                                                                    </tbody>

                                                            }
                                                        </Table>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Collapse>
                                    </Col>
                                )
                            })
                            :
                            <Col>
                                <p style={{ textAlign: 'center' }}>No Departments Found</p>
                            </Col>
                        }
                    </Row>

                    <Row>
                        <Col style={{ padding: 20 }}>
                            <Button block color="primary" onClick={() => this.setState({ showAddDeptForm: true })}>Add New Department</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Department