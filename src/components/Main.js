import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUsers, getQuestions} from '../redux/ActionCreators'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import Home from './Home'
import Login from './Login';
import {Route, withRouter, Switch} from 'react-router-dom';
import Header from './Header';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import ViewPoll from './ViewPoll';


function Main (){
    // const [pollOrAns, changePage] = useState('')
    // const [ques, changeQid] = useState('')
    
    const dispatch = useDispatch()
    const {authedUser} = useSelector((state) => ({
        authedUser: state.authedUser
    }))

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getQuestions())
    }, [])
    
    return (      
        <React.Fragment>
            <Header id={authedUser} />
        <Container > 
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/add' component={NewQuestion} />
                <Route exact path='/questions' component={Home} />
                <Route exact path='/leaderboard' component={LeaderBoard} />
                <Route path='/questions/:qid' component={ViewPoll}/>
            </Switch>
          
        </Container>
        </React.Fragment>  
        
        );
}

export default withRouter(Main)