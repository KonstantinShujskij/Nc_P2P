import { LOAD, CLEAR } from '../types/user.types'


export function load(user) {
    return {
        type: LOAD,
        payload: user 
    }
}

export function clear() {
    return {
        type: CLEAR
    }
}
