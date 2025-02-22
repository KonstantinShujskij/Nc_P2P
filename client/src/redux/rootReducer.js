import { combineReducers } from 'redux'
import authRuducer from './authRuducer'
import userReducer from './userReducer'
import alertReducer from './alertRuducer'
import filterReducer from './filterReducer'


const rootReducer = combineReducers({
    auth: authRuducer,
    user: userReducer,
    alert: alertReducer,

    filter: filterReducer
})


export default rootReducer