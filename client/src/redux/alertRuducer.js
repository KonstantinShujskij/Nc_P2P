import { SHOW, HIDE } from './types/alert.types'

const initialState = {
    mess: ''
}

export default function alertReducer(state=initialState, action) {
    switch(action.type) {
    case SHOW:
        return { mess: action.payload }
    case HIDE:
        return {...initialState}
    default:
        return state
    }
}