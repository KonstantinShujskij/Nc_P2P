import { SET_INVOICES, CLEAR_INVOICES } from './types/filter.types'
import { SET_PAYMENTS, CLEAR_PAYMENTS } from './types/filter.types'
import { SET_POOL, CLEAR_POOL } from './types/filter.types'
import { SET_PROOF, CLEAR_PROOF } from './types/filter.types'


const initialState = {
    payments: {
        id: '',
        refId: '',
        partnerId: '',

        card: '',
        status: null,

        initialAmount: { min: '', max: '' },
        currentAmount: { min: '', max: '' },
        amount: { min: '', max: '' },
    },
    invoices: {
        id: '',
        refId: '',
        partnerId: '',

        status: null,
        card: '',
        payment: '',

        amount: { min: '', max: '' },
        initialAmount: { min: '', max: '' },
    },
    pool: {
        id: '',
        refId: '',
        partnerId: '',

        status: ['WAIT'],
        card: '',
        payment: '',

        amount: { min: '', max: '' },
        initialAmount: { min: '', max: '' },
    },
    proof: {
        id: '',

        invoice: '',
        payment: '',
        status: ['WAIT', 'VALID'],
        bank: '',
        kvit: '',

        amount: { min: '', max: '' }
    },

    paymentTriger: false,
    invoiceTriger: false,
    poolTriger: false,
    proofTriger: false
}

export default function filterReducer(state=initialState, action) {
    switch(action.type) {
    case SET_PAYMENTS:
        return {...state, payments: {...state.payments, ...action.payload}, paymentTriger: !state.paymentTriger}
    case SET_INVOICES:
        return {...state, invoices: {...state.invoices, ...action.payload}, invoiceTriger: !state.invoiceTriger}
    case SET_POOL:
        return {...state, pool: {...state.pool, ...action.payload}, poolTriger: !state.poolTriger}
    case SET_PROOF:
        return {...state, proof: {...state.proof, ...action.payload}, proofTriger: !state.proofTriger}

    case CLEAR_PAYMENTS:
        return {...state, payments: {...initialState.payments}, paymentTriger: !state.paymentTriger}
    case CLEAR_INVOICES:
        return {...state, invoices: {...initialState.invoices}, invoiceTriger: !state.invoiceTriger}
    case CLEAR_POOL:
        return {...state, pool: {...initialState.pool}, poolTriger: !state.poolTriger}
    case CLEAR_PROOF:
        return {...state, proof: {...initialState.proof}, proofTriger: !state.proofTriger}
    
    default:
        return state
    }
}