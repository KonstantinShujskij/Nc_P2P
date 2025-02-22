import { useDispatch } from 'react-redux'

import * as filterActions from '../redux/actions/filter.actions'


export default function useFilter() {
    const dispatch = useDispatch()

    const setPaymentsFilter = (filter) => { dispatch(filterActions.setPayments(filter)) } 
    const setInvoicesFilter = (filter) => { dispatch(filterActions.setInvouces(filter)) } 
    const setPoolFilter = (filter) => { dispatch(filterActions.setPool(filter)) } 
    const setProofFilter = (filter) => { dispatch(filterActions.setProof(filter)) } 

    const clearPaymentsFilter = () => { dispatch(filterActions.clearPayments()) }    
    const clearInvoicesFilter = () => { dispatch(filterActions.clearInvoices()) }
    const clearPoolFilter = () => { dispatch(filterActions.clearPool()) }
    const clearProofFilter = () => { dispatch(filterActions.clearProof()) }

    const clear = () => {
        dispatch(filterActions.clearPayments())
        dispatch(filterActions.clearInvoices())
        dispatch(filterActions.clearPool())
        dispatch(filterActions.clearProof())
    }

    return {
        setPaymentsFilter,
        setInvoicesFilter,
        setPoolFilter,
        setProofFilter,

        clearPaymentsFilter,
        clearInvoicesFilter,
        clearPoolFilter,
        clearProofFilter,

        clear
    }
}