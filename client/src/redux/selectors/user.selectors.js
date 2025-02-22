export const isUserLoad = (state) => !!state.user.id
export const user = (state) => state.user
export const balance = (state) => state.user.balance 
export const waitBalance = (state) => state.user.waitBalance 

export const paymentActive = (state) => state.user.paymentActive
export const ibanActive = (state) => state.user.ibanActive