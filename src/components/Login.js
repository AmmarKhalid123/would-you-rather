import React, {useState} from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {Row, Col, Form, FormGroup, Label, Button,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {setAuthedUser} from '../redux/ActionCreators';
import { Link, Redirect } from 'react-router-dom'

function UsersDropdown(props) {
    return (
        props.users.map((user) => (
            <DropdownItem key={user} onClick={(e) => {
                e.preventDefault();
                props.setAuth(user);
            }}>
                {user}
            </DropdownItem>
        ))
    )
}


function Login () {
    const {reqUrl, users, authedUser} = useSelector(state => ({
        reqUrl: state.reqUrl,
        users: state.users,
        authedUser: state.authedUser
    }), shallowEqual)
    
    const dispatch = useDispatch()
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, changeUser] = useState(null); //containing which user is selected on login page


    const setAuth = (uid) => {
        changeUser(uid)
    }
    //upon login
    const goHome = () => {
        dispatch(setAuthedUser(user))
        setAuth(null)
    }

    const toggle = () => setDropdownOpen(prevState => !prevState);

    if (authedUser === null){
        return(
            <Row >
                <Col className='text-center' md={{size: 6, offset: 3}}
                    style={{backgroundColor: '#34c9eb', marginTop: 30, borderRadius: '40px',
                            height: '200px' }}
                >
                <Form className='mt-10' >
                    <FormGroup>
                        <Label className='h4 mb-3 mt-4'>
                            Choose Your Id to Login
                        </Label>
                        
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle caret>
                            {user === null ? 'Select User' : user }
                            </DropdownToggle>
                        <DropdownMenu>
                            <UsersDropdown users={Object.keys(users)} setAuth={setAuth} />
                        </DropdownMenu>
                        </Dropdown>
                        
                        <Link to={reqUrl} >
                        <Button className='mt-3' onClick={goHome} disabled={user === null} >
                            <span>Login</span>
                        </Button>
                        </Link>
                    </FormGroup>
                </Form>
               
                </Col>
            </Row>
        );
    }
    else{
        return (
            <Redirect to='/' />
        )
    }
    
}

export default Login