export const token = (state) => state.auth.token
export const userId = (state) => state.auth.userId
export const isAuth = (state) => !!state.auth.token
export const isAdmin = (state) => state.auth.isAdmin
export const adminAccess = (state) => state.auth.access

