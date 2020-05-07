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


function Login (props) {
    const {authedUser, users} = useSelector(state => ({
        authedUser: state.authedUser,
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
        <Row>
            <Form>
                <FormGroup>
                    <Label>
                        Choose Your Id
                    </Label>
                    
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                        {user === null ? 'Select User' : user }
                        </DropdownToggle>
                    <DropdownMenu>
                        <UsersDropdown users={Object.keys(users)} setAuth={setAuth} />
                    </DropdownMenu>
                    </Dropdown>
                    
                    <Link to='/questions'>
                    <Button onClick={goHome} disabled={user === null} >
                        <span>Login</span>
                    </Button>
                    </Link>
                </FormGroup>
            </Form>
           
        </Row>

    );
}

export default Login