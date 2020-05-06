import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import Question from './Question';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button, Media } from 'reactstrap';


const mapStateToProps = (state) => {    
    return {
        users: state.users,
        questions: state.questions,
        authedUser: state.authedUser
    }
}


function Home(props) {
    const [currentQuestions, changePage] = useState('answered')
    useEffect(() => {
    })
    const handleClick = (a) => {
        changePage(a)
    }
    
    const questionIds = Object.keys(props.questions)
    if (questionIds.length !== 0){
        return(
            <div>
            <Row className='row-content mt-2'>
                    <Col md={{size: 6, offset: 3}}>
                        <Button color="primary" disabled={currentQuestions !== 'unanswered'} block
                        onClick={() => handleClick('answered')}>
                            Answered Q.
                        </Button>
                        <Button color="primary" disabled={currentQuestions !== 'answered'} block
                        onClick={() => handleClick('unanswered')}>
                            UnAnswered Q.
                        </Button>        
                    </Col>
                </Row>
            <Row>
                <Col md={{size: 6, offset: 3}}>
                    {currentQuestions === 'answered' 
                    ? <Media list>
                        {questionIds.filter(id => Object.keys(props.users[props.authedUser].answers).includes(id))
                    .map(id => <Question ques={props.questions[id]}/>)}
                    </Media>
                    : <Media list>
                        {questionIds.filter(id => Object.keys(props.users[props.authedUser].answers).indexOf(id) === -1)
                    .map((id) => <Question ques={props.questions[id]} />)
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
            <div></div>
        )
    }
}
export default connect(mapStateToProps)(Home)