import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavbarToggler, NavbarBrand, Collapse, Nav, NavItem, NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { logout } from '../redux/actions'

class Header extends Component {

    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this)
        this.state = { isOpen:false }
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout() {
        this.props.logout()
    }

    toggle() { this.setState({ isOpen:!this.state.isOpen }) }

    render() {
        return(
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarToggler onClick={this.toggle} />
                    <NavbarBrand tag={Link} to="/">College Dashboard</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/" >Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/dept" >Departments</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/teacher" >Teacher</NavLink>
                            </NavItem>
                            <NavItem onClick={this.handleLogout}>
                                <NavLink>Logout</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default connect(null, { logout })(Header)