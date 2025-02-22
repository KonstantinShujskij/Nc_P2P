import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import useInvoiceApi from '../../API/invoice.api'
import usePage from '../../hooks/page.hook'

import * as filterSelectors from '../../redux/selectors/filter.selectors'

import Invoice from '../../components/Invoice/Invoice'
import InvoiceFilter from '../../components/InvoiceFilter/InvoiceFilter'

import styles from './Invoices.module.css'


function Invoices() {
  const invoiceApi = useInvoiceApi()

  const pagination = usePage(30)
  const page = pagination.page

  const triger = useSelector(filterSelectors.invoiceTriger)

  const [invoices, setInvoices] = useState([])

  const load = async (page) => {
    const {list, count} = await invoiceApi.list(page, pagination.limit)

    pagination.setCount(count)
    setInvoices(list)
  }

  useEffect(() => {
    const timer = setInterval(() => load(page), 10000)
    load(page)

    return () => { clearInterval(timer) }
  }, [page, triger])


  return (
    <div className={styles.main}>
        <div className={styles.top}>
          <InvoiceFilter />
        </div>

        <div className={styles.table}>
            {invoices.map((invoice) => <Invoice invoice={invoice} refresh={() => load(page)} key={invoice.id} />)}
        </div>

        <div className={styles.bottom}>
            <button onClick={pagination.back}>
                Previos
            </button>
            <button onClick={pagination.next}>
                Next
            </button>
        </div>
    </div>
  )
}

export default Invoices