import React, { Component } from 'react'
import { Container, Row, Col, Table, Button } from 'reactstrap';
import axios from 'axios'
import CustomModal from '../Components/CustomModal'

const initialState = {
    showAddTeacherForm: false,
    showEditTeacherForm: false,
    showEnterAllDataAlert: false,
}
class Teacher extends Component {

    state = { teachers: [], ...initialState }

    componentDidMount() {
        this.fetchDepartments()
        this.getTeachers()
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    fetchDepartments() {
        axios.get('/department')
            .then(res => { this.setState({ departments: res.data }) })
            .catch(err => console.log(err))
    }

    getTeachers() {
        axios.get('/teacher')
            .then(res => {
                this.setState({ teachers: res.data, ...initialState })
            })
            .catch(err => console.log(err))
    }

    addTeacher() {
        const { teacherName, teacherDepartment } = this.state
        if (teacherName && teacherDepartment && teacherDepartment !== '1') {
            axios.put('/teacher', { name: teacherName, department: teacherDepartment })
                .then(res => {
                    this.getTeachers()
                    this.setState({ ...initialState })
                })
                .catch(err => console.log(err))
        } else {
            this.setState({ showEnterAllDataAlert: true })
        }
    }

    editTeacher() {
        const { teacherId, teacherName, teacherDepartment } = this.state
        if (teacherId && teacherName && teacherDepartment && teacherDepartment !== '1') {
            axios.post(`/teacher/${teacherId}`, { name: teacherName, department: teacherDepartment })
                .then(res => {
                    this.setState({ ...initialState })
                    this.getTeachers()
                })
                .catch(err => console.log(err))
        } else {
            this.setState({ showEnterAllDataAlert: true })
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.departments
                    &&
                    <CustomModal
                        isOpen={this.state.showAddTeacherForm}
                        handleInputChange={this.handleInputChange}
                        fields={
                            [
                                { fieldName: "teacherName", value: this.state.teacherName, placeholder: "Name" },
                            ]
                        }
                        selectFields={
                            [
                                {
                                    data: [{ _id: '1', name: 'Select Department' }, ...this.state.departments],
                                    fieldName: "teacherDepartment",
                                    value: this.state.teacherDepartment
                                }
                            ]
                        }
                        showEnterAllDataAlert={this.state.showEnterAllDataAlert}
                        onSubmit={() => this.addTeacher()}
                        onCancel={() => this.setState({ ...initialState })}
                    />
                }

                {
                    this.state.departments
                    &&
                    <CustomModal
                        isOpen={this.state.showEditTeacherForm}
                        handleInputChange={this.handleInputChange}
                        fields={
                            [
                                { fieldName: "teacherName", value: this.state.teacherName, placeholder: "Name" },
                            ]
                        }
                        selectFields={
                            [
                                {
                                    data: [{ _id: '1', name: 'Select Department' }, ...this.state.departments],
                                    fieldName: "teacherDepartment",
                                    value: this.state.teacherDepartment
                                }
                            ]
                        }
                        showEnterAllDataAlert={this.state.showEnterAllDataAlert}
                        onSubmit={() => this.editTeacher()}
                        onCancel={() => this.setState({ ...initialState })}
                    />
                }

                <Container>
                    <Row>
                        <Col style={{ padding: 20 }}>
                            <Button color="primary" onClick={() => this.setState({ showAddTeacherForm: true })}>Add New Teacher</Button>
                        </Col>
                    </Row>
                    <Row>
                        {
                            this.state.teachers && this.state.teachers.length > 0 &&
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
                                        {
                                            this.state.teachers.map((teacher, index) => {
                                                return (
                                                    <tr key={teacher._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{teacher.name}</td>
                                                        <td>{teacher.department.name}</td>
                                                        <td>
                                                            <Button color="link" onClick={() => this.setState({ teacherName: teacher.name, teacherDepartment: teacher.department._id, teacherId: teacher._id, showEditTeacherForm: true })}>Edit</Button>
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
                </Container>
            </div>
        )
    }
}

export default Teacher