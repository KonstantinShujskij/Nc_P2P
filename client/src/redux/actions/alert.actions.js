import { SHOW, HIDE } from '../types/alert.types'

export function setMess(mess) {
    return {
        type: SHOW,
        payload: mess
    }
}

export function clearMess() {
    return {
        type: HIDE
    }
}
