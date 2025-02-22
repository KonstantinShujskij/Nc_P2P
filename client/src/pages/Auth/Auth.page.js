import React, { useEffect, useState } from 'react'

import useInput from '../../hooks/input.hook'
import useAuth from '../../hooks/auth.hook'

import Input from '../../components/UI/Input'

import styles from './Auth.module.css'
import useUserApi from '../../API/user.api'


function Auth() {
  const [twoFA, setTwoFA] = useState(false)

  const login = useInput() 
  const password = useInput() 
  const code = useInput()

  const User = useUserApi()
  const auth = useAuth()

  const twoFAHandler = async () => { 
    setTwoFA(await User.twoFA(login.value, password.value)) 
  }
  
  const loginHandler = async () => { 
    const data = await User.verify(login.value, password.value, code.value)

    if(data) {
      const {token, userId} = data
      return auth.login(token, userId)
    }

    code.clear()
    setTwoFA(false) 
  }

  useEffect(() => { twoFA? code.focus() : login.focus() }, [twoFA])

  
  return (
    <div className={styles.main}>
      {!twoFA && (
        <div className={styles.form}>
          <h3 className={styles.title}>Hello Admin</h3>
          <Input input={login} onComplite={password.focus} type='text' placeholder='Login' />
          <Input input={password} onComplite={twoFAHandler} type='password' placeholder='Password' />
          <button onClick={twoFAHandler}>Lets Go</button>
        </div>
      )}

      {twoFA && (
        <div className={styles.form}>
          <h3 className={styles.title}>2FA Code</h3>
          <Input input={code} onComplite={loginHandler} type='text' placeholder='Code' />
          <button onClick={() => loginHandler()}>Approve</button>
        </div>
      )}
    </div>
  )
}


export default Auth