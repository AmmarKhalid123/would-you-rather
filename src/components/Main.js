import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
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
import ErrorPage from './ErrorPage';
import DoesNotExist from './DoesNotExist';

function Main (){
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getQuestions())
    }, [dispatch])

    
    return (      
        <React.Fragment>
            <Header />
            <Container > 
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/add' component={NewQuestion} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/leaderboard' component={LeaderBoard} />
                    <Route path='/questions/:qid' component={ViewPoll}/>
                    <Route path='/404page' component={DoesNotExist} />
                    <Route path='/:error' component={ErrorPage} />
                </Switch>
            </Container>
        </React.Fragment>  
        
        );
}

export default withRouter(Main)