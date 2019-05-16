import React, { Component } from 'react'
import { Container, Row, Col, Form, Button, FormGroup, Input, Alert } from 'reactstrap'
import axios from 'axios'
import { connect } from 'react-redux'
import { login } from '../redux/actions'

const initialState = {
    showEnterAllDataAlert: false
}

class Auth extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { ...initialState, activeTab: '1', email: "", password: "" };
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        }
    }

    handleLogin() {
        const { email, password } = this.state
        if (email && password) {
            axios.post('/teacher/login', { email, password })
                .then(res => { this.props.login(res.data) })
                .catch(err =>{
                    if(err.response && err.response.status === 400) {
                        alert("Invalid email or password.\nPlease check and try again")
                    } else {
                        console.log(err)
                    }
                })
        } else {
            this.setState({ showEnterAllDataAlert: true }, () => {
                setTimeout(() => {
                    this.setState({ showEnterAllDataAlert: false })
                }, 3000)
            })
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Row style={{ marginTop: '30vh' }}>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <Row>
                                <Col sm="12">
                                    <Form>
                                        <h3 style={{ textAlign: 'center', marginBottom: '50px' }}>Login</h3>
                                        <FormGroup>
                                            <Input
                                                type="email"
                                                name="email"
                                                placeholder="Enter Email"
                                                value={this.state.email || ''}
                                                onChange={this.handleInputChange}
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Input
                                                type="password"
                                                name="password"
                                                placeholder="Enter Password"
                                                value={this.state.password || ''}
                                                onChange={this.handleInputChange}
                                            />
                                        </FormGroup>

                                        <Button color="primary" block onClick={() => this.handleLogin()}>Submit</Button>
                                    </Form>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ marginTop: '20px' }}>
                                    <Alert isOpen={this.state.showEnterAllDataAlert} color="danger">Enter all data before submitting</Alert>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default connect(null, { login })(Auth)