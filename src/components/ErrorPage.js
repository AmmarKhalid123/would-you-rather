import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {addReqUrl} from '../redux/ActionCreators'
import {Redirect } from 'react-router-dom';

export default function ErrorPage (props) {
    const authedUser = useSelector((state) => state.authedUser);
    const dispatch = useDispatch()

    if(authedUser !== null) {
        return (
            <Redirect to='/404page' />
        )
    }
    else{
        
        dispatch(addReqUrl(props.match.params.error))
        return(
            <Redirect to='/login' />    
        )
    }
    
}