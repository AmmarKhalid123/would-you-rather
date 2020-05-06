import * as ActionTypes from '../ActionTypes'

export function AuthedUser (state = null, action) {
    switch (action.type) {
        case ActionTypes.SET_AUTHED_USER:
            return action.payload
        default: 
            return state
    }
}