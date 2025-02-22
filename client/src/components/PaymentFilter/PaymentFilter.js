import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import * as filterSelectors from '../../redux/selectors/filter.selectors'

import Input from '../UI/Input'
import useInput from '../../hooks/input.hook'
import useFilter from '../../hooks/filter.hook'

import styles from './PaymentFilter.module.css'


function PaymentFilter() {
    const { setPaymentsFilter } = useFilter()
    const filter = useSelector(filterSelectors.payment)

    const [statusList, setStatusList] = useState(filter?.status)
    const cardNumber = useInput(filter?.card, (card) => setPaymentsFilter({ card }))

    const initialAmountMin = useInput(filter?.initialAmount?.min, (min) => setPaymentsFilter({ initialAmount: { min, max: initialAmountMax.value } }))
    const initialAmountMax = useInput(filter?.initialAmount?.max, (max) => setPaymentsFilter({ initialAmount: { min: initialAmountMin.value, max } }))

    const amountMin = useInput(filter?.amount?.min, (min) => setPaymentsFilter({ amount: { min, max: amountMax.value } }))
    const amountMax = useInput(filter?.amount?.max, (max) => setPaymentsFilter({ amount: { min: amountMin.value, max } }))

    const currentAmountMin = useInput(filter?.currentAmount?.min, (min) => setPaymentsFilter({ currentAmount: { min, max: currentAmountMax.value } }))  
    const currentAmountMax = useInput(filter?.currentAmount?.max, (max) => setPaymentsFilter({ currentAmount: { min: currentAmountMin.value, max } }))

    const systemId = useInput(filter?.id, (id) => setPaymentsFilter({ id }))
    const referenceId = useInput(filter?.refId, (refId) => setPaymentsFilter({ refId }))
    const partnerId = useInput(filter?.partnerId, (partnerId) => setPaymentsFilter({ partnerId }))


    const addStatusHandler = (status='ALL') => {
        if(status === 'ALL') { 
            setPaymentsFilter({ status: null })
            return setStatusList(null) 
        }

        setStatusList((prew) => {
            const oldValue = prew || []

            const newValue = oldValue.filter((item) => (item !== status))
            if(newValue.length === oldValue.length) { newValue.push(status) }

            setPaymentsFilter({ status: newValue.length? newValue : null })

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
                    <div className={styles.item}>
                        <Input input={currentAmountMin} className={styles.input} placeholder='Current Min' />
                        <Input input={currentAmountMax} className={styles.input} placeholder='Current Max' />
                    </div>
                </div>
            </div>
            <div className={styles.excel}>
                <div className={styles.card}>
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
                    <div 
                        className={`${styles.statusItem} ${!statusList?.length? styles.active : null}`} 
                        onClick={() => addStatusHandler('ALL')}
                        data-status="ALL" 
                    >
                        ALL
                    </div>
                    <div className={styles.item}>
                        <StatisItem status={'ACTIVE'} />
                        <StatisItem status={'BLOCKED'} />
                    </div>
                    <div className={styles.item}>
                        <StatisItem status={'SUCCESS'} />
                        <StatisItem status={'REJECT'} />
                    </div>
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

export default PaymentFilter