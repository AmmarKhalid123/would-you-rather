import React, { useEffect, useState } from 'react'
import { useSelector, shallowEqual } from 'react-redux';
import Question from './Question';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button, Media } from 'reactstrap';
import { Redirect, Switch } from 'react-router-dom';

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

    
    if (authedUser !== null){
        const questionIds = Object.keys(questions)
    
        const allAnsQues = questionIds.filter(qid => Object.keys(users[authedUser].answers).includes(qid))
                            .map(id => questions[id]);

        const allUnansQues = questionIds.filter(qid => Object.keys(users[authedUser].answers).indexOf(qid) === -1)
                            .map((id) => questions[id]);

        return(
            <React.Fragment>
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
                        
                    <Question status='answered' allQues={allAnsQues}/>
                    </Media>
                    : <Media list>
                        <Question status='unanswered' allQues={allUnansQues} />
                    
                    </Media>
                    }
                </Col>
            </Row>
            </React.Fragment>
        );
    }
    else{
        return (
            <Redirect to='/' />
        )
    }
}
export default Home