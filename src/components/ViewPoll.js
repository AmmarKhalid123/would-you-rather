import React from 'react';
import {useSelector} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Media, Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import ResultCard from './ResultCard';
import AnsQuestion from './AnsQuestion';

export default function ViewPoll (props) {
    const { users, authedUser, questions } = useSelector((state) => ({
        users: state.users,
        authedUser: state.authedUser,
        questions: state.questions
    }))
    const quesId = props.match.params.qid;


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
        const view = Object.keys(users[authedUser].answers).includes(quesId) ? 'answered' : 'unanswered'
        
        const totalV = totalVotes(questions[quesId]);
        const optionOneVotes = questions[quesId].optionOne.votes.length;
        const optionTwoVotes = questions[quesId].optionTwo.votes.length;
        return(
        <Media height='100' style={{
            margin: 10,
            maxWidth: 500
        }}>
            <Media left middle>
                <Media object src={users[questions[quesId].author].avatarURL} alt={questions[quesId].author}
                style={{maxHeight: 150,
                        maxWidth: 150
                }} />
            </Media>
            {view === 'answered' ?
                <Media body className='ml-2'>
                <Media heading>
                {questions[quesId].author} asked
                </Media>
                <ResultCard opt={questions[quesId].optionOne.text} 
                votes={optionOneVotes} 
                outOf={totalV} 
                urAns={userVotedFor(authedUser, questions[quesId], 'optionOne')} />
                
                <br/>
                
                <ResultCard opt={questions[quesId].optionTwo.text} 
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
    
    );
}
else {
    return(
    <Redirect to='/' />
)}
}