import * as ActionTypes from '../ActionTypes'

export function Questions (state = {}, action) {
    switch (action.type) {
        case ActionTypes.GET_QUESTIONS:
            return action.payload
        case ActionTypes.POST_QUESTION:
            const key = Object.keys(action.payload)[0]
            return {...state, [key]: action.payload[key]}
        default: 
            return state
    }
}