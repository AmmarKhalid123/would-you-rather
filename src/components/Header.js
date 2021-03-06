import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReqUrl } from '../redux/ActionCreators';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap'
import { setAuthedUser } from '../redux/ActionCreators';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faHome, faTrophy, faSignInAlt } from '@fortawesome/free-solid-svg-icons'

//Nav bar
export default function Header () {
    const [isNavOpen, toggleNavBar] = useState(false)
    
    const {users, authedUser} = useSelector(state => ({users: state.users, authedUser : state.authedUser}))

    const toggleNav = () => {
        toggleNavBar(!isNavOpen)
    }

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(setAuthedUser(null))
    }
    
    const auth = (req) => {
        if (authedUser === null) {
            dispatch(addReqUrl(req))
        }
    }

    return(
        <Navbar color='primary' dark expand="md">
                <div className="container">
                    <NavbarToggler onClick={toggleNav}/>
                    <NavbarBrand className="mr-auto" >
                    Would You Rather
                    </NavbarBrand> 
                    <Collapse isOpen={isNavOpen} navbar>
                    <Nav navbar className='ml-4'>
                        <NavItem>
                            <NavLink className="nav-link" to='/'
                            onClick={() => auth('/')} >
                            <FontAwesomeIcon icon={faHome}></FontAwesomeIcon> Home
                            </NavLink> 
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to={authedUser !== null ? '/add' : '/'}
                            onClick={() => auth('/add')} >
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> New Question
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to={authedUser !== null ? '/leaderboard' : '/'}
                            onClick={() => auth('/leaderboard')} >
                            <FontAwesomeIcon icon={faTrophy}></FontAwesomeIcon> LeaderBoard
                            </NavLink> 
                        </NavItem>
                    </Nav>
                    {/* To be shown if someone is logged in */}
                    {authedUser !== null && (
                        <Nav navbar className="ml-auto">
                        <NavItem>
                            <img src={users[authedUser].avatarURL} height='50'
                            width='50' alt={users[authedUser].name} style={{borderRadius: '30px'}} />
                        </NavItem>
                        <NavItem>
                        <h5 className='mt-2 ml-1 text-white'>Hey, {users[authedUser].name}</h5>
                        </NavItem>
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