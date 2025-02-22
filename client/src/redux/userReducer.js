import { LOAD, CLEAR } from './types/user.types'

const initialState = {}

export default function userReducer(state=initialState, action) {
    switch(action.type) {
    case LOAD:
        return {...action.payload}
    case CLEAR:
        return {...initialState}
    default:
        return state
    }
}