import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Media, Row, Col} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import ResultCard from './ResultCard';
import AnsQuestion from './AnsQuestion';
import { addReqUrl } from '../redux/ActionCreators';

//rendering the detailed view for answered as well as unanswered questions
export default function ViewPoll (props) {
    const { users, authedUser, questions } = useSelector((state) => ({
        users: state.users,
        authedUser: state.authedUser,
        questions: state.questions
    }))

    const quesId = props.match.params.qid;

    const dispatch = useDispatch()

    const totalVotes = (ques) => {
        const count = ques.optionOne.votes.length + ques.optionTwo.votes.length;
        return count;
    }

    const userVotedFor = (uid, ques, opt) => {
        if (Object.keys(users[uid].answers).includes(ques.id)){
            if (users[uid].answers[ques.id] === opt){
                return true
            }
        }
        else{
            return false
        }
    }   

    if (authedUser !== null) {
        if (Object.keys(questions).includes(quesId)){
            console.log('aksndka')
            const view = Object.keys(users[authedUser].answers).includes(quesId) ? 'answered' : 'unanswered'
            
            const totalV = totalVotes(questions[quesId]);
            const optionOneVotes = questions[quesId].optionOne.votes.length;
            const optionTwoVotes = questions[quesId].optionTwo.votes.length;
            return(
                <Row>
                    <Col md={{size: 6, offset: 3}}>
                    <Media height='100' className='badge-light' style={{
                margin: 10,
                minWidth: 500
            }}>
                <Media left middle style={{borderRadius: '40px'}} >
                    <Media object src={users[questions[quesId].author].avatarURL} alt={questions[quesId].author}
                    style={{maxHeight: 130,
                            maxWidth: 130,
                            borderRadius: '70px',
                            margin: '10px' 
                    }} />
                </Media>
                {view === 'answered' ?
                    <Media body className='ml-2'>
                    <Media heading>
                    {questions[quesId].author} asked
                    </Media>
                    <ResultCard className='mr-2 ml-2' opt={questions[quesId].optionOne.text} 
                    votes={optionOneVotes} 
                    outOf={totalV} 
                    urAns={userVotedFor(authedUser, questions[quesId], 'optionOne')} />
                    
                    <br/>
                    
                    <ResultCard className='mr-2 ml-2' opt={questions[quesId].optionTwo.text} 
                    votes={optionTwoVotes} 
                    outOf={totalV}
                    urAns={userVotedFor(authedUser, questions[quesId], 'optionTwo')} />
                    
                    <br />
                </Media> :
        
                <Media body className='ml-4'>
                    <Media heading>
                    {questions[quesId].author} asks would you rather
                    </Media>
                    <AnsQuestion quesId={quesId} optionOneText={questions[quesId].optionOne.text}
                    optionTwoText={questions[quesId].optionTwo.text}  />
                </Media>}
            </Media>
        
                    </Col>
                </Row>
            
        );
        }
        else {
            return(
                <Redirect to='/404page' />
            )    
        }
    }
    else {
        dispatch(addReqUrl(`/questions/${quesId}`))
        return(
            <Redirect to='/' />
            )
        
    }
    
}