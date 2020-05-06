import * as ActionTypes from './ActionTypes'
import {_getUsers, _getQuestions} from '../_DATA'

export const getUsers = () => (dispatch) => {
    return _getUsers().then(res => dispatch(addUsers(res)))    
}

function addUsers (users) {
    return {
        type: ActionTypes.GET_USERS,
        payload: users
    }
}

export const getQuestions = () => (dispatch) => {
    return _getQuestions().then(res => dispatch(addQuestions(res)))    
}

function addQuestions (questions) {
    return {
        type: ActionTypes.GET_QUESTIONS,
        payload: questions
    }
}

export const setAuthedUser = (uid) => {
    return {
        type: ActionTypes.SET_AUTHED_USER,
        payload: uid
    }
}