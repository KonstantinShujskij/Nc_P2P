import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import * as filterSelectors from '../../redux/selectors/filter.selectors'

import Input from '../UI/Input'
import useInput from '../../hooks/input.hook'
import useFilter from '../../hooks/filter.hook'

import styles from './InvoiceFilter.module.css'


function InvoiceFilter() {
    const { setInvoicesFilter } = useFilter()
    const filter = useSelector(filterSelectors.invoice)

    const [statusList, setStatusList] = useState(filter?.status)
    const cardNumber = useInput(filter?.card, (card) => setInvoicesFilter({ card }))
    const paymentId = useInput(filter?.payment, (payment) => setInvoicesFilter({ payment }))

    const initialAmountMin = useInput(filter?.initialAmount?.min, (min) => setInvoicesFilter({ initialAmount: { min, max: initialAmountMax.value } }))
    const initialAmountMax = useInput(filter?.initialAmount?.max, (max) => setInvoicesFilter({ initialAmount: { min: initialAmountMin.value, max } }))

    const amountMin = useInput(filter?.amount?.min, (min) => setInvoicesFilter({ amount: { min, max: amountMax.value } }))
    const amountMax = useInput(filter?.amount?.max, (max) => setInvoicesFilter({ amount: { min: amountMin.value, max } }))

    const systemId = useInput(filter?.id, (id) => setInvoicesFilter({ id }))
    const referenceId = useInput(filter?.refId, (refId) => setInvoicesFilter({ refId }))
    const partnerId = useInput(filter?.partnerId, (partnerId) => setInvoicesFilter({ partnerId }))


    const addStatusHandler = (status='ALL') => {
        if(status === 'ALL') { 
            setInvoicesFilter({ status: null })
            return setStatusList(null) 
        }

        setStatusList((prew) => {
            const oldValue = prew || []

            const newValue = oldValue.filter((item) => (item !== status))
            if(newValue.length === oldValue.length) { newValue.push(status) }

            setInvoicesFilter({ status: newValue.length? newValue : null })

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
                        <Input input={initialAmountMin} className={styles.input} placeholder='Initial Min' />
                        <Input input={initialAmountMax} className={styles.input} placeholder='Initial Max' />
                    </div>
                    <div className={styles.item}>
                        <Input input={amountMin} className={styles.input} placeholder='Amount Min' />
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
                        <Input input={cardNumber} className={styles.input} placeholder='Card Number' />
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
                    <div 
                        className={`${styles.statusItem} ${!statusList?.length? styles.active : null}`} 
                        onClick={() => addStatusHandler('ALL')}
                        data-status="ALL" 
                    >
                        ALL
                    </div>
                    <div className={styles.item}>
                        <StatisItem status={'WAIT'} />
                        <StatisItem status={'VALID'} />
                    </div>
                    <div className={styles.item}>
                        <StatisItem status={'CONFIRM'} />
                        <StatisItem status={'REJECT'} />
                    </div>
                </div>
            </div>

            <div className={styles.excel}>
                <div className={styles.time}>Create At</div>
            </div>
        </div>
    )
}


export default InvoiceFilter