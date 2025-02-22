import {  useRef, useState } from 'react'


const noop = () => true

export default function useInput(defaultValue='', callback=noop, validation=noop) {
    const [value, setValue] = useState(defaultValue)
    const ref = useRef(null)

    const onChange = (event) => { 
        const tempValue = event.target.value

        if(!validation(tempValue)) { return }

        changeValue(tempValue)    
    }

    const changeValue = (newValue) => { 
        if(newValue !== value) { 
            setValue(newValue) 
            callback(newValue)
        } 
    }

    const clear = () => changeValue('')
    const focus = () => ref?.current?.focus()

    return {
        bind: { value, ref, onChange },
        value,
        changeValue,
        clear,
        focus
    }
}