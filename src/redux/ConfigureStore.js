import { createStore, combineReducers, applyMiddleware } from 'redux'
import {Users} from './reducers/users'
import {Questions} from './reducers/questions'
import {AuthedUser} from './reducers/authedUser'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

export const ConfigureStore = () => {
    const store = createStore(combineReducers({
        users: Users,
        questions: Questions,
        authedUser: AuthedUser,
    }), applyMiddleware(thunk, logger))
    return store
}