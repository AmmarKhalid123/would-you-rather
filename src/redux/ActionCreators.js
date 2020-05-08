import * as ActionTypes from './ActionTypes'
import {_getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../_DATA'

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

export const postQuestion = ({optionOneText, optionTwoText, author }) => (dispatch) => {
    return  _saveQuestion({optionOneText, optionTwoText, author }).then(res => dispatch(addQuestion(res)))
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