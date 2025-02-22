import useApi from '../hooks/api.hook'
import { useSelector } from 'react-redux'
import * as filterSelectors from '../redux/selectors/filter.selectors'


export default function useInvoiceApi() {
    const { publicRequest, protectedRequest } = useApi()

    const filter = useSelector(filterSelectors.invoice)

    const reject = async (id) => {       
        try { return await protectedRequest('api/invoice/reject', {id}) }
        catch(error) { return null } 
    }

    const list = async (page=1, limit=20) => {       
        try { return await protectedRequest('api/invoice/list', {filter, page, limit}) }
        catch(error) { return {list: [], count: 0} } 
    }

    return { 
        reject,
        list
    }
}