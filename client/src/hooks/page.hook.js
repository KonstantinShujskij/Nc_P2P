import {  useEffect, useState } from 'react'


export default function usePage(limit=10, len=0) {
    const [count, setCount] = useState(len)
    const [page, setPage] = useState(1)
    const [isNext, setIsNext] = useState(false)
    const [isBack, setIsBack] = useState(false)

    useEffect(() => {
        setIsNext(count / limit - page > 0)
        setIsBack(page > 1)
    }, [page, count, limit])

    const back = () => { if(isBack) { setPage((prev) => prev - 1) } }
    const next = () => { if(isNext) { setPage((prev) => prev + 1) } }

    const to = (page) => { 
        if(page < 1) return
        if(page - 1 > count / limit) return

        setPage(page)
    }

    const start = () => to(1)

    const getRange = () => {
        const begin = (page - 1) * limit
        const end = (begin + limit) < count? (begin + limit) : count
    
        return {begin, end}
    }

    return {
        page,
        isNext,
        isBack,
        limit,
        count,
        
        setCount,
        next,
        back,
        start,
        to,
        getRange
    }
}