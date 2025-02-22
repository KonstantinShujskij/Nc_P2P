import useApi from '../hooks/api.hook'
import { useSelector } from 'react-redux'
import * as filterSelectors from '../redux/selectors/filter.selectors'


export default function useProofApi() {
    const { publicRequest, protectedRequest } = useApi()

    const filter = useSelector(filterSelectors.proof)

    const approve = async (id, amount, kvitNumber) => {       
        try { return await protectedRequest('api/proof/accept', {id, amount, kvitNumber}) }
        catch(error) { return false } 
    }

    const decline = async (id) => {       
        try { return await protectedRequest('api/proof/decline', {id}) }
        catch(error) { return false } 
    }

    const list = async (page=1, limit=20) => {       
        try { return await protectedRequest('api/proof/list', {filter, page, limit}) }
        catch(error) { return {list: [], count: 0} } 
    }

    return { 
        approve,
        decline,
        list
    }
}