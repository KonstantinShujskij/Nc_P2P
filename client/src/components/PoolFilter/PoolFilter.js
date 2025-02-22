import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import * as filterSelectors from '../../redux/selectors/filter.selectors'

import Input from '../UI/Input'
import useInput from '../../hooks/input.hook'
import useFilter from '../../hooks/filter.hook'

import styles from './PoolFilter.module.css'


function PoolFilter() {
    const { setInvoicesFilter } = useFilter()
    const filter = useSelector(filterSelectors.invoice)

    const [statusList, setStatusList] = useState(['WAIT'])
    const cardNumber = useInput(filter?.card, (card) => setInvoicesFilter({ card }))
    const paymentId = useInput(filter?.payment, (payment) => setInvoicesFilter({ payment }))

    const initialAmountMin = useInput(filter?.initialAmount?.min, (min) => setInvoicesFilter({ initialAmount: { min, max: initialAmountMax.value } }))
    const initialAmountMax = useInput(filter?.initialAmount?.max, (max) => setInvoicesFilter({ initialAmount: { min: initialAmountMin.value, max } }))

    const amountMin = useInput(filter?.amount?.min, (min) => setInvoicesFilter({ amount: { min, max: amountMax.value } }))
    const amountMax = useInput(filter?.amount?.max, (max) => setInvoicesFilter({ amount: { min: amountMin.value, max } }))

    const currentAmountMin = useInput(filter?.currentAmount?.min, (min) => setInvoicesFilter({ currentAmount: { min, max: currentAmountMax.value } }))
    const currentAmountMax = useInput(filter?.currentAmount?.max, (max) => setInvoicesFilter({ currentAmount: { min: currentAmountMin.value, max } }))

    const systemId = useInput(filter?.id, (id) => setInvoicesFilter({ id }))
    const referenceId = useInput(filter?.refId, (refId) => setInvoicesFilter({ refId }))
    const partnerId = useInput(filter?.partnerId, (partnerId) => setInvoicesFilter({ partnerId }))

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
                        <Input input={initialAmountMin} className={styles.input} placeholder='Initial Min' />
                        <Input input={initialAmountMax} className={styles.input} placeholder='Initial Max' />
                    </div>
                    <div className={styles.item}>
                        <Input input={amountMin} className={styles.input} placeholder='Amount Min' />
                        <Input input={amountMax} className={styles.input} placeholder='Amount Max' />
                    </div>
                    <div className={styles.item}>
                        <Input input={currentAmountMin} className={styles.input} placeholder='Current Min' />
                        <Input input={currentAmountMax} className={styles.input} placeholder='Current Max' />
                    </div>
                </div>
            </div>
            <div className={styles.excel}>
                <div className={styles.card}>
                    <div className={styles.item}>
                        <Input input={paymentId} className={styles.input} placeholder='Payment Id' />
                    </div>
                    <div className={styles.item}>
                        <Input input={cardNumber} className={styles.input} placeholder='Card Number' />
                    </div>
                </div>
            </div>
            <div className={styles.excel}>
                <div className={styles.id}>
                    <div className={styles.item}>
                        <Input input={systemId} className={styles.input} placeholder='System Id' />
                    </div>
                    <div className={styles.item}>
                        <Input input={referenceId} className={styles.input} placeholder='Reference Id' />
                    </div>
                    <div className={styles.item}>
                        <Input input={partnerId} className={styles.input} placeholder='Partner Id' />
                    </div>
                </div>
            </div>
            <div className={styles.excel}>
                <div className={styles.status}>
                    <StatisItem status={'WAIT'} />
                </div>
            </div>
            <div className={styles.excel}>
                <div className={styles.time}>Action</div>
            </div>
            <div className={styles.excel}>
                <div className={styles.time}>Create At</div>
            </div>
        </div>
    )
}


export default PoolFilter