import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import { shallowEqual } from '@babel/types';
import { postQuestion } from '../redux/ActionCreators';


export default function NewQuestion (props) {
    const [goHome, changePage] = useState(false)
    const [optionOne, changeOne] = useState('')
    const [optionTwo, changeTwo] = useState('')

    const authedUser = useSelector((state) => state.authedUser, shallowEqual);

    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(postQuestion({optionOneText: optionOne, optionTwoText: optionTwo, author: authedUser}))
        changePage(!goHome)
    }

    if (authedUser !== null && !goHome) {
        console.log('in Newques =>',authedUser)
        return(
            <Form onSubmit={handleSubmit}>
                    <h4>Create Your Question</h4>
                <FormGroup>
                    <Label htmlFor='optionOne'>Would You Rather</Label>
                    <Col>
                        <Input type='text' id='optionOne' name='optionOne'
                                onChange={(event) => changeOne(event.target.value)}
                                placeholder='Enter first Option' />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='optionTwo'>Or</Label>
                    <Col  md={10}>
                        <Input type='text' id='optionTwo' name='optionTwo'
                                onChange={(event) => changeTwo(event.target.value)}
                                placeholder='Enter Second Option' />
                    </Col>
                </FormGroup>
                <Button type="submit" value="submit" color="primary" disabled={optionOne === '' && optionTwo === ''}>Submit </Button>
            </Form>
        )
    }
    else {
        return(
            <Redirect to='/questions' />
        )
    }
    
}