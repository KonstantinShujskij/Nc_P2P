import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as auth from '../redux/actions/auth.actions'
import * as authSelectors from '../redux/selectors/auth.selectors'
import * as userSelectors from '../redux/selectors/user.selectors'
// import useWorker from './worker.hook'
// import useFilter from './filter.hook'


export default function useAuth() {
    const dispath = useDispatch()
    const token = useSelector(authSelectors.token)
    const isAdmin = useSelector(authSelectors.isAdmin)
    const isUserLoad = useSelector(userSelectors.isUserLoad)

    // const Worker = useWorker()
    // const Filter = useFilter()

    
    useEffect(() => { 
        if(token) { 
            //Worker.update()  
        }
        if(!token) { 
            //Filter.clear()
        }
    }, [token, isUserLoad, isAdmin])

    const login = (userToken, userId) => { dispath(auth.login(userToken, userId)) }
    const logout = () => { dispath(auth.logout()) }

    
    return { login, logout }
}