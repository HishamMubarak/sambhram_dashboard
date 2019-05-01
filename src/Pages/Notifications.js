import React, { Component } from 'react'
import axios from 'axios';
import { Button, Table, Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux'
import CustomModal from '../Components/CustomModal'


const initialState = {
    courseId: null,
    batchName: null,
    showAddBatchModal: false,
    showEditBatchModal: false,
    showEnterAllDataAlert: false,
    notificationTitle: null,
    notificationText: null,
    showNotificationModal: false,
    departmentId: null
}

class Notifications extends Component {

    state = { notifications: [], ...initialState }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    fetchNotifications() {
        axios.get('/notification')
            .then(res => { this.setState({ notifications: res.data }) })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.fetchNotifications()
    }

    deleteNotification(notificationId) {
        axios.delete(`/notification/${notificationId}`)
        .then(res => this.fetchNotifications())
        .catch(err => console.log(err))
    }

    sendCollegeNotification() {
        const { notificationText, notificationTitle } = this.state
        if (notificationText && notificationTitle) {
            let sendData = {
                title: notificationTitle,
                description: notificationText
            }

            // eslint-disable-next-line no-unused-expressions
            this.state.departmentId ? sendData.departmentId = this.state.departmentId : null

            axios.post('/notification', sendData)
                .then(res => {
                    this.fetchNotifications()
                    this.setState({ ...initialState })
                })
                .catch(err => console.log(err))
        } else {
            this.setState({ showEnterAllDataAlert: true })
        }
    }

    render() {
        return (
            <Container>
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
                    onSubmit={() => this.sendCollegeNotification()}
                    onCancel={() => this.setState({ ...initialState })}
                />
                
                {this.state.notifications && this.state.notifications.length > 0 ?
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Body</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.notifications.map((each, index) => {
                                return (
                                    <tr key={each._id}>
                                        <td>{index + 1}</td>
                                        <td>{each.title}</td>
                                        <td>{each.description}</td>
                                        <td style={{ textAlign: 'right' }}>
                                            <Button
                                                onClick={() => this.deleteNotification(each._id)}
                                                variant="outline-success">Delete</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    :
                    <div style={{ marginTop: 100 }}>
                        <p style={{ textAlign:'center' }}>No Notifications Found</p>
                    </div>
                }
                {
                    this.props.roleId === 2 &&<Button
                        color="primary"
                        onClick={() => this.setState({ showNotificationModal: true })}>
                        Send College Notification
                    </Button>
                }
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        roleId:state.auth.roleId
    }
}

export default connect(mapStateToProps)(Notifications)