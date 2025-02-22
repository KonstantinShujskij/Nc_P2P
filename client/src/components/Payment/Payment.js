import React, { useState } from 'react'
import usePaymentApi from '../../API/payment.api'

import styles from './Payment.module.css'
import Copy from '../UI/copy'


function formatCardNumber(number) {
    if(!number) { return "0000 0000 0000 0000" }
    return number.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();
}

function formatTime(milliseconds) {
    if(!milliseconds) return null

    return (new Date(parseInt(milliseconds))).toLocaleString("uk-UA", {timeZone: "Europe/Kiev"}).replace(',', '')
}


function Payment({payment, refresh}) {
    const paymentApi = usePaymentApi()
    
    const [isBlock, setIsBlock] = useState(false)
    const [wait, setWait] = useState(false)

    const blockHandler = async () => {
        if(!isBlock) { return setIsBlock(true) }

        setIsBlock(false)
        setWait(true)

        const paymentIsBlock = !!(await paymentApi.block(payment.card))
        setWait(false)
        if(paymentIsBlock) { refresh() }
    }

    const freezeHandler = async () => {
        if(payment.isFreeze) { await paymentApi.unfreeze(payment.id) }
        else { await paymentApi.freeze(payment.id) }

        refresh()
    }

    const rejectHandler = async () => {
        await paymentApi.reject(payment.id)
        refresh()
    }

    return (
        <div className={styles.main}>
            <div className={styles.excel}>
                <div className={styles.amount}>
                    <Copy value={payment?.initialAmount} label={payment?.initialAmount || 0} />
                    <Copy value={payment?.amount} label={payment?.amount || 0} />
                    <Copy value={payment?.currentAmount} label={payment?.currentAmount || 0} />
                </div>
            </div>
            <div className={styles.excel}>
                <div className={styles.card}>
                    <Copy value={payment?.card} label={formatCardNumber(payment?.card)} />
                </div>
            </div>
            <div className={styles.excel}>
                <div className={styles.id}>
                    <Copy value={payment?.id} label={payment?.id? payment.id : 'SystemId'} />
                    <Copy value={payment?.refId} label={payment?.refId? payment.refId : 'ReferenceId'} />
                    <Copy value={payment?.partnerId} label={payment?.partnerId? payment.partnerId : 'PartnerId'} />
                </div>
            </div>
            <div className={styles.excel}>
                <div className={styles.status} data-status={payment?.status}>{payment?.status}</div>
            </div>
            <div className={styles.excel}>
                {!wait && (
                    <div className={styles.action}>
                        <div className={styles.buttons}>
                            <button 
                                className={`${styles.button} ${isBlock? styles.open : null}`} 
                                onClick={() => blockHandler()}
                                data-type="decline"
                            >
                                Block
                            </button>

                            {payment.status === "ACTIVE" && <>
                                <button 
                                    className={styles.button} 
                                    onClick={() => rejectHandler()}
                                    data-type="decline"
                                >
                                    Reject
                                </button>
                            </>}

                            {payment.status !== "SUCCESS" && payment.status !== "REJECT" && <>
                                <button 
                                    className={styles.button} 
                                    onClick={() => freezeHandler()}
                                    data-type="decline"
                                >
                                    {payment?.isFreeze? "Unfreeze" : "Freeze" }
                                </button>
                            </>}
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.excel}>
                <div className={styles.time}>{formatTime(payment?.createdAt)}</div>
            </div>
        </div>
    )
}

export default Payment