import { LOGIN, LOGOUT } from '../types/auth.types'

export function login(token, userId, isAdmin=false, access='NONE') {
    return {
        type: LOGIN,
        payload: { token, userId, isAdmin, access }
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}
