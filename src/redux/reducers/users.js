import * as ActionTypes from '../ActionTypes'

export function Users (state = {}, action) {
    switch (action.type) {
        case ActionTypes.GET_USERS:
            return action.payload

        case ActionTypes.POST_QUESTION:
            const key = Object.keys(action.payload)[0]
            const user = action.payload[key].author
            console.log(action.payload)
            return {
                ...state,
                [user]: {
                    ...state[user],
                    questions: state[user].questions.concat([key])
        }
            }
        case ActionTypes.SAVE_QUESTION_ANSWER:
            const authedUser = action.payload.authedUser
            const answer = action.payload.answer
            const qid = action.payload.qid

            return {
                ...state,
                [authedUser]: {
                ...state[authedUser],
                answers: {
                    ...state[authedUser].answers,
                    [qid]: answer
                    }
                }  
            }
        default: 
            return state
    }
}