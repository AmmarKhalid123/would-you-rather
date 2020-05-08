import React from 'react';
import { useSelector, useDispatch }  from 'react-redux';
import {addReqUrl} from '../redux/ActionCreators';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Media, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

function RenderLeader (props) {
    const { users, questions } = useSelector((state) => ({
        users: state.users,
        questions: state.questions,
    }))

    const questionsAsked = (quesIds, uid) => {
        let count = 0;
        quesIds.forEach((qid) => {
            questions[qid].author === uid && count++
        })
        return count
    }

    const questionsAnswered = (quesIds, uid) => {
        let count = 0;
        quesIds.forEach(qid => {
            if (questions[qid].optionOne.votes.includes(uid) || questions[qid].optionTwo.votes.includes(uid)){
                count++;
            }
        })
        return count
    }
    const compare = (a, b) => {
        // Use toUpperCase() to ignore character casing
        const scoreA = a.score;
        const scoreB = b.score;
      
        let comparison = 0;
        if (scoreA > scoreB) {
          comparison = 1;
        } else if (scoreA < scoreB) {
          comparison = -1;
        }
        return comparison * -1;
      }
      
    
    if (users !== null && users !== undefined){
        const usersId = Object.keys(users)
        const quesIds = Object.keys(questions)
        const scores = usersId.map(uid =>{
            const score =  questionsAnswered(quesIds, uid) + questionsAsked(quesIds, uid)
            return {uid: uid, score: score}
        }).sort(compare);

        return (
            <Row>
                {scores.map(({uid, score}) => (
                <Col md={{size: 6, offset: 3}}>
                    <Media tag='li' height='100' style={{
                    margin: 10,
                    maxWidth: 500
                }}>
                    <Media left middle>
                        <Media object src={users[uid].avatarURL} alt={users[uid]}
                        style={{maxHeight: 150,
                                maxWidth: 150
                        }} />
                    </Media>
                    <Media body className='ml-2'>
                        <Media heading>
                            {uid}
                        </Media>
                        <p>Questions Asked: {questionsAsked(quesIds, uid)}</p>
                        <p>Questions Answered: {questionsAnswered(quesIds, uid)}</p>
                        <h5>Total Score: {score}</h5>
                    </Media>
                </Media>
                
                </Col>
                    )
                )
                }
            </Row>
            
    )}
    else {
        return <div></div>
    }
}


export default function LeaderBoard (props) {
    const { authedUser, reqUrl } = useSelector((state) => ({
        authedUser: state.authedUser,
        reqUrl: state.reqUrl
    }))
    const dispatch = useDispatch()
    if (authedUser !== null){
        return (
            <Media list>
                <RenderLeader />
            </Media>
        );
    }
    else {
        dispatch(addReqUrl('/leaderboard'))
        return(
            <Redirect to='/' />
        )
    }
    
}