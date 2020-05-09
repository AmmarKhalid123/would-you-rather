import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Redirect } from 'react-router-dom';
import {addReqUrl} from '../redux/ActionCreators'

export default function DoesNotExist () {
    const authedUser = useSelector((state) => state.authedUser);
    const dispatch = useDispatch()

    if(authedUser !== null ){
        return(
            <h4>Error 404: Page does not exist</h4>
            )
    
    }
    else {
        dispatch(addReqUrl('/404page'))
        return(
            <Redirect to='/login' />    
        )
    }
}
