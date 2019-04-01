import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom'
import axios from 'axios'
import CustomModal from '../Components/CustomModal'

const initialState = {
    courseId:null,
    batchName:null,
    showAddBatchModal:false,
    showEditBatchModal:false,
    showEnterAllDataAlert:false
}

class Home extends Component {

    state = { ...initialState }

    componentDidMount() {
        this.fetchCourses()
    }

    fetchCourses() {
        axios.get(`/department/${"5ca04efdc753b32d1bf90d18"}`)
        .then(res =>{
            console.log(res.data)
            this.setState({ department:res.data })} )
        .catch(err => console.log(err))
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]:e.target.value })
    }

    addBatch() {
        if(this.state.batchName) {
            axios.put(`/batch`, { name:this.state.batchName, course:this.state.courseId, department:this.state.department[0]._id })
            .then(res => {
                this.setState({ ...initialState })
                console.log(res)
            })
            .catch(err => console.log(err))
        } else {
            this.setState({ showEnterAllDataAlert:false })
        }
    }

    editBatch() {
        if(this.state.batchName && this.state.batchId) {
            axios.post(`/batch/${this.state.batchId}`, { name:this.state.batchName })
            .then(res => {
                this.setState({ ...initialState })
                console.log(res)
            })
            .catch(err => console.log(err))
        } else {
            this.setState({ showEnterAllDataAlert:true })
        }
    }

    deleteBatch() {
        if(this.state.batchId) {
            axios.delete(`/batch/${this.state.batchId}`)
            .then(res => {
                this.setState({ ...initialState })
                console.log(res)
            })
            .catch(err => console.log(err))
        } else {
            this.setState({ showEnterAllDataAlert:false })
        }
    }

    render() {
        return(
            <Container style={{ marginTop:50 }}>

                <CustomModal
                    isOpen={this.state.showAddBatchModal}
                    handleInputChange={this.handleInputChange}
                    fields={
                        [
                            { fieldName:"batchName", value:this.state.batchName, placeholder:"Batch Name" }
                        ]
                    }
                    showEnterAllDataAlert={this.state.showEnterAllDataAlert}
                    onSubmit={ () => this.addBatch() }
                    onCancel={ () => this.setState({ ...initialState })}
                />

                <CustomModal
                    isOpen={this.state.showEditBatchModal}
                    handleInputChange={this.handleInputChange}
                    fields={
                        [
                            { fieldName:"batchName", value:this.state.batchName, placeholder:"Batch Name" }
                        ]
                    }
                    showDeleteButton={true}
                    showEnterAllDataAlert={this.state.showEnterAllDataAlert}
                    onSubmit={ () => this.editBatch() }
                    onDelete={ () => this.deleteBatch() }
                    onCancel={ () => this.setState({ ...initialState })}
                />

                {
                    this.state.department &&
                        <React.Fragment>
                            <Row>
                                <Col>
                                    <h2 style={{ textAlign:'center' }}>{this.state.department[0].name}</h2>
                                </Col>
                            </Row>

                            {
                                this.state.department && this.state.department.length > 0 &&
                                    this.state.department.map(each => {
                                        return (
                                            <Row key={each.courses._id} style={{ marginTop:25, marginBottom:25 }}>
                                                
                                                <Col sm="12">
                                                    <Row style={{ margin:10 }}> 
                                                        <Col sm="9">
                                                            <h3>{each.courses.name}</h3>
                                                        </Col>
                                                        <Col sm="3">
                                                            <Button color="primary" block onClick={ () => this.setState({ courseId:each.courses._id, showAddBatchModal:true })}>Add New Batch</Button>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                                    {
                                                        each.courses.batches.map(batch => {
                                                            return (
                                                                <Col key={batch._id} sm="4">
                                                                    <Card>
                                                                        <CardBody>
                                                                            <CardTitle>{batch.name}</CardTitle>
                                                                            <Link style={{ margin:10, textDecoration: 'none', color: 'white' }} to={`/batch/${batch._id}`} ><Button color="primary">Details</Button></Link>
                                                                            <Button color="primary" onClick={ () => this.setState({ batchId:batch._id, batchName:batch.name, showEditBatchModal:true })}>Edit</Button>
                                                                        </CardBody>
                                                                    </Card>
                                                                </Col>
                                                            )
                                                        })
                                                    }
                                            </Row>
                                        )
                                    })
                            }
                    </React.Fragment> 
                }                
            </Container>
        )
    }
}

export default Home