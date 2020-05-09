import React, { useState } from 'react'
import { useSelector, shallowEqual } from 'react-redux';
import {useLastLocation} from 'react-router-last-location';
import Question from './Question';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button, Media } from 'reactstrap';
import { Redirect } from 'react-router-dom';

//rendering the root page, of answered and unanswered questions
function Home() {
    //getting the state from store
    const {users, questions, authedUser} = useSelector( (state) => {    
        return {
            users: state.users,
            questions: state.questions,
            authedUser: state.authedUser
        }
    }, shallowEqual)
    
    const lastLocation = useLastLocation()
    let loc = 'unanswered';
    if (lastLocation !== null){
        const path = lastLocation.pathname.split('/');
        if (path.length === 3 && Object.keys(questions).includes(path[2])) {
            const quesId = path[2];
            if (questions[quesId].optionOne.votes.includes(authedUser) || questions[quesId].optionTwo.votes.includes(authedUser)){
                loc = 'answered'
            }
        }
    }
    //state containing which page to be shown
    const [currentQuestions, changePage] = useState(loc)

    
    const handleClick = (a) => {
        changePage(a)
    }

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
                    ? 
                        <Media list>
                            <Question status='answered' allQues={allAnsQues}/>
                        </Media>
                    : 
                        <Media list>
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
            <Redirect to='/login' />
        )
    }
}
export default Home