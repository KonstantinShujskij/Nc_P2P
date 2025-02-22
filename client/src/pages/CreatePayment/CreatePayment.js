import React from 'react'

import useInput from '../../hooks/input.hook'

import Input from '../../components/UI/Input'

import styles from './CreatePayment.module.css'
import usePaymentApi from '../../API/payment.api'
import useAlert from '../../hooks/alert.hook'


function CreatePayment() {
  const amount = useInput(0) 
  const card = useInput('') 

  const Payment = usePaymentApi()
  const Alert = useAlert()

  const createHandler = async () => { 
    const data = await Payment.create(card.value, amount.value)

    if(data) {
      Alert.pushMess('Success')
    } 
  }
  
  return (
    <div className={styles.main}>
        <div className={styles.form}>
          <h3 className={styles.title}>Make Payment</h3>
          <Input input={card} type='text' placeholder='card' />
          <Input input={amount} type='text' placeholder='0' />
          <button onClick={createHandler}>Create</button>
        </div>
    </div>
  )
}


export default CreatePayment