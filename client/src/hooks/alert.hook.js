import { useDispatch } from 'react-redux'
import { setMess, clearMess } from '../redux/actions/alert.actions'


export default function useAlert() {
    const dispatch = useDispatch()
    
    const pushMess = (text) => {
        dispatch(setMess({
            type: 'message',
            text
        }))
        
        setTimeout(() => dispatch(clearMess()), 1500)  
    }

    const pushError = (text) => {
        dispatch(setMess({
            type: 'error',
            text
        }))
        
        setTimeout(() => dispatch(clearMess()), 1500)  
    }

    return { 
        pushMess,
        pushError
    }
}