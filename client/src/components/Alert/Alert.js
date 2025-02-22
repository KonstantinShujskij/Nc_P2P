import React from 'react'
import { useSelector } from 'react-redux'

import * as selectors from '../../redux/selectors/alert.selectors'

import styles from './Alert.module.css' 


function Alert() {
    const mess = useSelector(selectors.mess)

    return (
        <div className={`${styles.alert} ${mess? styles.active : null} ${mess.type}`}>
            {mess.text}
        </div>
    )
}

export default Alert