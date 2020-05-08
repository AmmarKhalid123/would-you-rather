import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveQueAns } from '../redux/ActionCreators'
import { Redirect } from 'react-router-dom';


//A form to answer an unanswered question
export default function AnsQuestion(props) {
    const [radioVal, changeRadVal] = useState('') //state containing the form value
    const authedUser = useSelector(state => state.authedUser)
    const dispatch = useDispatch()
    

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(saveQueAns({
            authedUser: authedUser,
            qid: props.quesId,
            answer: radioVal
        }))
    }
    if (authedUser !== null){
        return(
            <Form >
                <FormGroup tag="fieldset">
                    <FormGroup check>
                    <Label check>
                        <Input type="radio" name="optionOne"
                        checked={radioVal === 'optionOne'}
                        onChange={() => changeRadVal('optionOne')} />{' '}
                        {props.optionOneText}
                  
                    </Label>
                    </FormGroup>
                    <FormGroup check>
                    <Label check>
                        <Input type="radio" name="optionTwo" 
                        checked={radioVal === 'optionTwo'}
                        onChange={() => changeRadVal('optionTwo')} />{' '}
                        {props.optionTwoText}
                    </Label>
                    </FormGroup>
                </FormGroup>
                
                <Button type='submit' onClick={(event) => handleSubmit(event)}
                disabled={radioVal !== 'optionOne' && radioVal !== 'optionTwo'} > Submit</Button>
            </Form>
        );
    }
    else{
        return(
            <Redirect to='/'/>
        )
    }
}