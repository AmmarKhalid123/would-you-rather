import * as ActionTypes from './ActionTypes'
import {_getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer, addUser } from '../_DATA'
import { showLoading, hideLoading} from 'react-redux-loading'

export const getUsers = () => (dispatch) => {
    dispatch(showLoading())
    return _getUsers().then(res => dispatch(addUsers(res))).then(dispatch(hideLoading()))    
}

function addUsers (users) {
    return {
        type: ActionTypes.GET_USERS,
        payload: users
    }
}

export const getQuestions = () => (dispatch) => {
    dispatch(showLoading())
    return _getQuestions().then(res => dispatch(addQuestions(res))).then(dispatch(hideLoading()))
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

export const postQuestion = ({optionOneText, optionTwoText, author }) => (dispatch) => {
    dispatch(showLoading())
    return  _saveQuestion({optionOneText, optionTwoText, author }).then(res => dispatch(addQuestion(res))).then(dispatch(hideLoading()))
}

const addQuestion = (res) => {
    return {
        type: ActionTypes.POST_QUESTION,
        payload: {[res.id]: res}
    }
}

export const saveQueAns = ({authedUser, qid, answer}) => (dispatch) => {
    return _saveQuestionAnswer({authedUser, qid, answer}).then(dispatch(addAnsQues({authedUser, qid, answer})))
}

const addAnsQues = ({authedUser, qid, answer}) => {
    return {
        type: ActionTypes.SAVE_QUESTION_ANSWER,
        payload: {authedUser, qid, answer}
    }
}

export const addReqUrl = (url) => ({
    type: ActionTypes.SET_URL,
    payload: url
})

const addAuthedUser = (user) => ({
    type: ActionTypes.ADD_USER,
    payload: user
})

export const saveAuthedUser = (user) => (dispatch) => {
    return addUser(user).then(dispatch(addAuthedUser(user)))
}