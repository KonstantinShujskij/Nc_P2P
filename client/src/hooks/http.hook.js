import { useCallback, useState } from 'react'
import { BASE_URL, FRONT_URL } from '../const'

export default function useHttp() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method='GET', body=null, headers={}, type='json') => {
        function newError(status=520, message = 'Opps..') { return { status, message } }

        setLoading(true)

        try {
            if(body && type === 'json') { 
                body = JSON.stringify(body) 
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(`${FRONT_URL}/${url}`, {method, body, headers})
            const data = await response.json()

            if(!response.ok) { throw newError(response.status, data.error) }

            setLoading(false)
            return data
        } catch(e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return { loading, error, request, clearError }
}