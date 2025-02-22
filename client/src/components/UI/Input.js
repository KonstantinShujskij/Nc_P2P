import React from 'react'


function Input({type='text', placeholder='', className, input, onComplite=()=>{}}) {
  const handleKeyDown = (event) => {
    if(event.key === "Enter") { onComplite() }
  }

  return (
    <input 
      {...input.bind} 
      className={className}  
      type={type} 
      placeholder={placeholder} 
      onKeyDown={handleKeyDown} 
    />
  )
}

export default Input