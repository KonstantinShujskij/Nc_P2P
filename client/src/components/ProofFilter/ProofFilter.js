import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import * as filterSelectors from '../../redux/selectors/filter.selectors'

import Input from '../UI/Input'
import useInput from '../../hooks/input.hook'
import useFilter from '../../hooks/filter.hook'

import styles from './ProofFilter.module.css'


function ProofFilter() {
    const { setProofFilter } = useFilter()
    const filter = useSelector(filterSelectors.proof)

    const [statusList, setStatusList] = useState(filter?.status)
    const paymentId = useInput(filter?.payment, (payment) => setProofFilter({ payment }))
    const invoiceId = useInput(filter?.invoice, (invoice) => setProofFilter({ invoice }))
    const kvit = useInput(filter?.kvit, (kvit) => setProofFilter({ kvit }))
    
    const amountMin = useInput(filter?.amount?.min, (min) => setProofFilter({ amount: { min, max: amountMax.value } }))
    const amountMax = useInput(filter?.amount?.max, (max) => setProofFilter({ amount: { min: amountMin.value, max } }))

    const systemId = useInput(filter?.id, (id) => setProofFilter({ id }))


    const addStatusHandler = (status='ALL') => {
        if(status === 'ALL') { 
            setProofFilter({ status: null })
            return setStatusList(null) 
        }

        setStatusList((prew) => {
            const oldValue = prew || []

            const newValue = oldValue.filter((item) => (item !== status))
            if(newValue.length === oldValue.length) { newValue.push(status) }

            setProofFilter({ status: newValue.length? newValue : null })

            return newValue.length? newValue : null
        })
    }

    const StatisItem = ({status}) => (
        <div 
            className={`${styles.statusItem} ${statusList?.includes(status)? styles.active : null}`} 
            onClick={() => addStatusHandler(status)}
            data-status={status} 
        >
            {status}
        </div>
    ) 


    return (
        <div className={styles.main}>
            <div className={styles.excel}>
                <div className={styles.amount}>
                    <div className={styles.item}>
                        <Input input={amountMin} className={styles.input} placeholder='Amount Min' />
                    </div>
                    <div className={styles.item}>
                        <Input input={amountMax} className={styles.input} placeholder='Amount Max' />
                    </div>
                </div>
            </div>
            <div className={styles.excel}>
                <div className={styles.card}>
                    <div className={styles.item}>
                        <Input input={paymentId} className={styles.input} placeholder='Payment Id' />
                    </div>
                    <div className={styles.item}>
                        <Input input={invoiceId} className={styles.input} placeholder='Invoice Id' />
                    </div>
                    <div className={styles.item}>
                        <Input input={kvit} className={styles.input} placeholder='Kvit Number' />
                    </div>
                </div>
            </div>
            <div className={styles.excel}>
                <div className={styles.id}>
                    <div className={styles.item}>
                        <Input input={systemId} className={styles.input} placeholder='System Id' />
                    </div>
                </div>
            </div>
            <div className={styles.excel}>
                <div className={styles.status}>
                    <div className={styles.item}>
                        <div 
                            className={`${styles.statusItem} ${!statusList?.length? styles.active : null}`} 
                            onClick={() => addStatusHandler('ALL')}
                            data-status="ALL" 
                        >
                            ALL
                        </div>
                        <StatisItem status={'WAIT'} />
                    </div>
                    <div className={styles.item}>
                        <StatisItem status={'CONFIRM'} />
                        <StatisItem status={'REJECT'} />
                    </div>
                </div>
            </div>

            <div className={styles.excel}>
                <div className={styles.action}>Actions</div>
            </div>

            <div className={styles.excel}>
                <div className={styles.time}>Create At</div>
            </div>
        </div>
    )
}


export default ProofFilter