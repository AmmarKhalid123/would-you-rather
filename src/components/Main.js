import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUsers, getQuestions} from '../redux/ActionCreators'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import Home from './Home'
import Login from './Login';
import {Route, withRouter} from 'react-router-dom';
import Header from './Header';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import ViewPoll from './ViewPoll';


function Main (){
    const [pollOrAns, changePage] = useState('')
    const [ques, changeQid] = useState('')
    
    const dispatch = useDispatch()
    const {authedUser} = useSelector((state) => ({
        authedUser: state.authedUser
    }))

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getQuestions())
    }, [])
    const changeTo = (a, q) => {
        changePage(a)
        changeQid(q)
    }

    return (      
        <React.Fragment>
            <Header id={authedUser} />
        <Container > 
          <Route exact path='/' component={Login} />
          <Route exact path='/add' component={NewQuestion} />
          <Route exact path='/home' render={
              () => <Home change={changeTo} />
          } />
          <Route exact path='/leaderboard' component={LeaderBoard} />
          <Route path='/home/:qid' render={
              () => <ViewPoll view={pollOrAns} ques={ques} />
          } />
        </Container>
        </React.Fragment>  
        
        );
}

export default withRouter(Main)