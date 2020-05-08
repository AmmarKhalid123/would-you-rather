import React, {useState} from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {Row, Col,Input, Form, FormGroup, Label, Button,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {setAuthedUser} from '../redux/ActionCreators';
import { Link } from 'react-router-dom'

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


function Login ({history, location, match}) {
    const {reqUrl, users} = useSelector(state => ({
        reqUrl: state.reqUrl,
        users: state.users
    }), shallowEqual)
    
    const dispatch = useDispatch()
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, changeUser] = useState(null); 


    const setAuth = (uid) => {
        changeUser(uid)
    }
    const goHome = () => {
        dispatch(setAuthedUser(user))
        setAuth(null)
    }

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return(
        <Row >
            <Col className='text-center' md={{size: 6, offset: 3}}
                style={{backgroundColor: '#34c9eb', marginTop: 30, }}
            >
            <Form className='mt-10'>
                <FormGroup>
                    <Label className='h4 mb-3'>
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

export default Login