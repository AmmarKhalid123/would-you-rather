import * as ActionTypes from '../ActionTypes'

export function Users (state = {}, action) {
    switch (action.type) {
        case ActionTypes.GET_USERS:
            return action.payload
        default: 
            return state
    }
}