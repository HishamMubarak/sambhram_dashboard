import React, { Component } from 'react'
import { Container, Row, Col, Table, Button } from 'reactstrap';
import axios from 'axios'
import CustomModal from '../Components/CustomModal'
import { connect } from 'react-redux'

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

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    fetchDepartments() {
        axios.get('/department')
            .then(res => {
                let departments = res.data

                if(this.props.roleId !== 1) {
                    departments = res.data.filter(each => {
                        return each._id === this.props.departmentId
                    })
                }

                this.setState({ departments })
            })
            .catch(err => console.log(err))
    }

    getTeachers() {
        axios.get('/teacher', { params: { departmentId:this.props.departmentId, roleId:this.props.roleId }})
            .then(res => {
                this.setState({ teachers: res.data, ...initialState })
            })
            .catch(err => console.log(err))
    }

    addTeacher() {
        const { teacherName, teacherEmail, teacherPassword, teacherDepartment } = this.state
        
        if(!this.validateEmail(teacherEmail)) {
            return alert("Enter valid email")
        }
        
        if (teacherName && teacherEmail && teacherPassword && teacherDepartment && teacherDepartment !== '1') {
            axios.put('/teacher', { name: teacherName, email:teacherEmail, password:teacherPassword, department: teacherDepartment })
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
        const { teacherId, teacherName, teacherEmail, teacherDepartment } = this.state

        if(!this.validateEmail(teacherEmail)) {
            return alert("Enter valid email")
        }

        if (teacherId && teacherName && teacherEmail && teacherDepartment && teacherDepartment !== '1') {
            axios.post(`/teacher/${teacherId}`, { name: teacherName, email:teacherEmail, department: teacherDepartment })
                .then(res => {
                    this.setState({ ...initialState })
                    this.getTeachers()
                })
                .catch(err => console.log(err))
        } else {
            this.setState({ showEnterAllDataAlert: true })
        }
    }

    deleteTeacher() {
        const { teacherId } = this.state
        if(teacherId) {
            axios.delete(`/teacher/${teacherId}`)
            .then(res => {
                this.getTeachers()
                this.setState({ ...initialState })
            })
        } else {
            alert("Error occurred")
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
                                { fieldName: "teacherEmail", value: this.state.teacherEmail, placeholder: "Email" },
                                { fieldName: "teacherPassword", value: this.state.teacherPassword, placeholder: "Password", type:"password" },
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
                                { fieldName: "teacherEmail", value: this.state.teacherEmail, placeholder: "Email" },
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
                        showDeleteButton={this.state.showEditTeacherForm}
                        onDelete={() => this.deleteTeacher()}
                        onSubmit={() => this.editTeacher()}
                        onCancel={() => this.setState({ ...initialState })}
                    />
                }

                <Container>
                    <Row>
                        <Col style={{ padding: 20 }}>
                            <Button color="primary" onClick={() => this.setState({
                                teacherName:'',
                                teacherEmail:'',
                                teacherPassword:'',
                                showAddTeacherForm: true })}>Add New Teacher</Button>
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
                                            <th>Email</th>
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
                                                        <td>{teacher.email}</td>
                                                        <td>{teacher.department.name}</td>
                                                        <td>
                                                            <Button color="link" onClick={() => this.setState({ teacherName: teacher.name, teacherEmail:teacher.email, teacherDepartment: teacher.department._id, teacherId: teacher._id, showEditTeacherForm: true })}>Edit</Button>
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


const mapStateToProps = state => {
    return {
        departmentId:state.auth.department,
        roleId:state.auth.roleId
    }
}

export default connect(mapStateToProps)(Teacher)