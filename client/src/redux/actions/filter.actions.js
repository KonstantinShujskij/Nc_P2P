import { SET_INVOICES, CLEAR_INVOICES } from '../types/filter.types'
import { SET_PAYMENTS, CLEAR_PAYMENTS } from '../types/filter.types'
import { SET_POOL, CLEAR_POOL } from '../types/filter.types'
import { SET_PROOF, CLEAR_PROOF } from '../types/filter.types'


export function setPayments(filter) {
    return {
        type: SET_PAYMENTS,
        payload: filter
    }
}

export function clearPayments() {
    return {
        type: CLEAR_PAYMENTS
    }
}

export function setInvouces(filter) {
    return {
        type: SET_INVOICES,
        payload: filter
    }
}

export function clearInvoices() {
    return {
        type: CLEAR_INVOICES
    }
}

export function setPool(filter) {
    return {
        type: SET_POOL,
        payload: filter
    }
}

export function clearPool() {
    return {
        type: CLEAR_POOL
    }
}


export function setProof(filter) {
    return {
        type: SET_PROOF,
        payload: filter
    }
}

export function clearProof() {
    return {
        type: CLEAR_PROOF
    }
}
