import * as ActionTypes from '../ActionTypes'

export function ReqUrl (state = '/questions', action) {
    switch (action.type) {
        case ActionTypes.SET_URL:
            return action.payload
        default: 
            return state
    }
}