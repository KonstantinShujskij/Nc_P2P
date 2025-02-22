import useApi from '../hooks/api.hook'
import { useSelector } from 'react-redux'
import * as filterSelectors from '../redux/selectors/filter.selectors'


export default function usePaymentApi() {
    const { publicRequest, protectedRequest } = useApi()

    const filter = useSelector(filterSelectors.payment)

    const create = async (card, amount, refId='', partnerId='') => {       
        try { return await protectedRequest('api/payment/create-admin', {card, amount, refId, partnerId}) }
        catch(error) { return null } 
    }

    const list = async (page=1, limit=20) => {       
        try { return await protectedRequest('api/payment/list', {filter, page, limit}) }
        catch(error) { return {list: [], count: 0} } 
    }

    const pool = async (page=1, limit=20) => {       
        try { return await protectedRequest('api/payment/list', {filter: {...filter, status: ['ACTIVE']}, page, limit}) }
        catch(error) { return {list: [], count: 0} } 
    }

    const block = async (card) => {       
        try { return await protectedRequest('api/payment/block', {card}) }
        catch(error) { return null } 
    }

    const reject = async (id) => {       
        try { return await protectedRequest('api/payment/reject', {id}) }
        catch(error) { return null } 
    }

    const freeze = async (id) => {       
        try { return await protectedRequest('api/payment/freeze', {id}) }
        catch(error) { return null } 
    }

    const unfreeze = async (id) => {       
        try { return await protectedRequest('api/payment/unfreeze', {id}) }
        catch(error) { return null } 
    }

    const push = async (id) => {       
        try { return await protectedRequest('api/payment/push', {id}) }
        catch(error) { return null } 
    }

    return { 
        create,
        list,
        pool,
        block,
        reject,
        freeze,
        unfreeze,
        push
    }
}