import * as ActionTypes from '../ActionTypes'

export function Questions (state = {}, action) {
    switch (action.type) {
        case ActionTypes.GET_QUESTIONS:
            return action.payload
        
        case ActionTypes.POST_QUESTION:
            const key = Object.keys(action.payload)[0]
            return {...state, [key]: action.payload[key]}

        case ActionTypes.SAVE_QUESTION_ANSWER:
            const authedUser = action.payload.authedUser
            const answer = action.payload.answer
            const qid = action.payload.qid

            return {
                ...state,
                [qid]: {
                  ...state[qid],
                  [answer]: {
                    ...state[qid][answer],
                    votes: state[qid][answer].votes.concat([authedUser])
                  }
                }
              }
        default: 
            return state
    }
}