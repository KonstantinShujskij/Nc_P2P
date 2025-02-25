import React from 'react'
import { formatCardNumber, formatTime } from '../../utils'

import Copy from '../UI/copy'

import styles from './Invoice.module.css'
import useInvoiceApi from '../../API/invoice.api'


function Invoice({invoice, refresh}) {
    const invoiceApi = useInvoiceApi()
    
    const rejectHandler = async () => {
        await invoiceApi.reject(invoice.id)
        refresh()
    }

    return (
        <div className={styles.main}>
            <div className={styles.excel}>
                <div className={styles.amount}>
                    <Copy value={invoice?.initialAmount} label={invoice?.initialAmount || 0} />
                    <Copy value={invoice?.amount} label={invoice?.amount || 0} />
                </div>
            </div>
            <div className={styles.excel}>
                <div className={styles.card}>
                    <Copy value={invoice?.payment} label={invoice?.payment} />
                    <Copy value={invoice?.card} label={formatCardNumber(invoice?.card)} />
                    <a href={invoice?.payLink} target='_blanck'>Link to Proof</a>
                </div>
            </div>
            <div className={styles.excel}>
                <div className={styles.id}>
                    <Copy value={invoice?.id} label={invoice?.id? invoice.id : 'SystemId'} />
                    <Copy value={invoice?.refId} label={invoice?.refId? invoice.refId : 'ReferenceId'} />
                    <Copy value={invoice?.partnerId} label={invoice?.partnerId? invoice.partnerId : 'PartnerId'} />
                </div>
            </div>
            <div className={styles.excel}>
                <div className={styles.status} data-status={invoice?.status}>{invoice?.status}</div>
            </div>
            <div className={styles.excel}>  
                <div className={styles.action}>
                    <div className={styles.buttons}>
                        {(invoice.status === "ACTIVE" || invoice.status === "VALID") && <>
                            <button 
                                className={styles.button} 
                                onClick={() => rejectHandler()}
                                data-type="decline"
                            >
                                Reject
                            </button>
                        </>}
                    </div>
                </div> 
            </div>
            <div className={styles.excel}>
                <div className={styles.time}>{formatTime(invoice?.createdAt)}</div>
            </div>
        </div>
    )
}


export default Invoice