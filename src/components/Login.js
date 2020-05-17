import React, {useState} from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {Row, Col, Form, FormGroup, Label, Button,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem, 
    Modal, ModalBody, ModalHeader, ModalFooter, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {setAuthedUser, saveAuthedUser} from '../redux/ActionCreators';
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
    const [modalOpen, changeModal] = useState(false);

    const [user, changeUser] = useState(null); //containing which user is selected on login page
    const toggleModal = () => {
        changeModal(!modalOpen)
    }

    const [newUserId, changeId] = useState('');
    const [newUserName, changeName] = useState('');


    const setAuth = (uid) => {
        changeUser(uid)
    }
    //upon login
    const goHome = () => {
        dispatch(setAuthedUser(user))
        setAuth(null)
    }
    const addUser = () => {
        toggleModal();
        //add info to redux
        const newUser = {[newUserId]: {
            id: newUserId,
            name: newUserName,
            avatarURL: "data:image/jpeg;base64,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",
            answers: {},
            questions: []
        }}
        dispatch(saveAuthedUser(newUser));
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

                        <Button  className='mt-3 ml-3' onClick={toggleModal}>
                            Sign Up
                        </Button>
                    </FormGroup>
                </Form>
                <Modal isOpen={modalOpen} toggle={toggleModal} backdrop={true}>
                    <ModalHeader toggle={toggleModal}>Sign Up Form</ModalHeader>
                    <ModalBody>
                    <Form>
                        <FormGroup>
                               <Label htmlFor="userId">
                                    Your ID
                                </Label>
                                <Input type="text" id="userId"
                                    name="userId"
                                    placeholder="Enter Your Id"
                                    value={newUserId}
                                    onChange = {e => changeId(e.target.value)}
                                    />
                        </FormGroup>
                        <FormGroup>
                               <Label htmlFor="userName">
                                    Your Name
                                </Label>
                                <Input type="text" id="name"
                                    name="name"
                                    placeholder="Enter Your Name"
                                    value={newUserName}
                                    onChange = {e => changeName(e.target.value)}
                                    />
                        </FormGroup>
                    </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" disabled={newUserId === '' || newUserName === ''} onClick={addUser}>Sign Up</Button>{' '}
                        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
               
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