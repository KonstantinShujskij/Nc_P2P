import React, { useState } from 'react'


function Copy({value='', label=''}) {
    const [copy, setCopy] = useState(false)
    const [timer, setTimer] = useState(null)

    const handler = () => {
        navigator.clipboard.writeText(value).then(() => {
            if(timer) { clearTimeout(timer) }

            setCopy(true)
            setTimer(setTimeout(() => setCopy(false), 500))
        })
    }

    return (
        <div className={`copy ${copy? 'active' : null}`} onClick={handler}>
            <span className='label'>{label}</span>
            <i class="fa-regular fa-copy"></i>
        </div>
    )
}

export default Copy