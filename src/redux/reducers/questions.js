import * as ActionTypes from '../ActionTypes'

export function Questions (state = {}, action) {
    switch (action.type) {
        case ActionTypes.GET_QUESTIONS:
            return action.payload
        default: 
            return state
    }
}