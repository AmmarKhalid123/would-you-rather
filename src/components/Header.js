import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button} from 'reactstrap'
import { setAuthedUser } from '../redux/ActionCreators';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faHome, faTrophy, faSignInAlt } from '@fortawesome/free-solid-svg-icons'


export default function Header (props) {
    const [isNavOpen, toggleNavBar] = useState(false)

    const toggleNav = () => {
        toggleNavBar(!isNavOpen)
    }

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(setAuthedUser(null))
    }
    
    return(
        <Navbar color='primary' dark expand="md">
                <div className="container">
                    <NavbarToggler onClick={toggleNav}/>
                    <NavbarBrand className="mr-auto" >
                        {/* <img src="./logo.png" height="30" width="41"
                        alt="Would you rather"/>  */}
                    Would You Rather
                    </NavbarBrand> 
                    <Collapse isOpen={isNavOpen} navbar>
                    <Nav navbar className='ml-4'>
                        <NavItem>
                            <NavLink className="nav-link" to={props.id !== null ? '/questions' : '/'}>
                            <FontAwesomeIcon icon={faHome}></FontAwesomeIcon> Home
                            </NavLink> 
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to={props.id !== null ? '/add' : '/'}>
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> New Question
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to={props.id !== null ? '/leaderboard' : '/'}>
                            <FontAwesomeIcon icon={faTrophy}></FontAwesomeIcon> LeaderBoard
                            </NavLink> 
                        </NavItem>
                    </Nav>
                    {props.id !== null && (
                        <Nav navbar className="ml-auto">
                        <NavItem>
                            <NavLink className='nav-link' onClick={handleLogout} to='/'>
                                <FontAwesomeIcon icon={faSignInAlt}></FontAwesomeIcon> Logout                            
                            </NavLink>                            
                        </NavItem>
                    </Nav>
                    )}
                    </Collapse>
                </div>
            </Navbar>
            
    );
} 