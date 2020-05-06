import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUsers, getQuestions} from '../redux/ActionCreators'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import Home from './Home'
import Login from './Login';
import {Route} from 'react-router-dom';
import Header from './Header';
import NewQuestion from './NewQuestion';


function Main (){
    const dispatch = useDispatch()
    const {authedUser} = useSelector((state) => ({
        authedUser: state.authedUser
    }))


    useEffect(() => {
        dispatch(getUsers())
        dispatch(getQuestions())
    })


    return (      
        <React.Fragment>
            <Header id={authedUser} />
        <Container > 
          <Route exact path='/' component={Login} />
          <Route exact path='/add' component={NewQuestion} />
          <Route exact path='/home' component={Home} />
        </Container>
        </React.Fragment>  
        
        );
}

export default Main