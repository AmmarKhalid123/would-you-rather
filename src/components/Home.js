import React, { useEffect, useState } from 'react'
import { useSelector, shallowEqual } from 'react-redux';
import Question from './Question';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button, Media } from 'reactstrap';
import { Redirect } from 'react-router-dom';

function Home(props) {
    const [currentQuestions, changePage] = useState('answered')
    useEffect(() => {
    })
    const handleClick = (a) => {
        changePage(a)
    }
    const {users, questions, authedUser} = useSelector( (state) => {    
        return {
            users: state.users,
            questions: state.questions,
            authedUser: state.authedUser
        }
    }, shallowEqual)
    
    if (authedUser !== undefined && users !== undefined && authedUser !== null){
        const questionIds = Object.keys(questions)
        return(
            <div>
            <Row className='mt-2'>
                    <Col md={{size: 6, offset: 3}}>
                        <Button color="primary" disabled={currentQuestions !== 'unanswered'} block
                        onClick={() => handleClick('answered')}>
                            Answered Questions
                        </Button>
                        <Button color="primary" disabled={currentQuestions !== 'answered'} block
                        onClick={() => handleClick('unanswered')}>
                            UnAnswered Questions
                        </Button>        
                    </Col>
                </Row>
            <Row>
                <Col md={{size: 6, offset: 3}}>
                    {currentQuestions === 'answered' 
                    ? <Media list>
                        {questionIds.filter(id => Object.keys(users[authedUser].answers).includes(id))
                    .map(id => <Question key={id} status='answered' change={props.change} ques={questions[id]}/>)}
                    </Media>
                    : <Media list>
                        {questionIds.filter(id => Object.keys(users[authedUser].answers).indexOf(id) === -1)
                    .map((id) => <Question key={id} status='unanswered' change={props.change} ques={questions[id]} />)
                    }
                    </Media>
                    }
                </Col>
            </Row>
            </div>
        );
    }
    else{
        return (
            <Redirect to='/' />
        )
    }
}
export default Home