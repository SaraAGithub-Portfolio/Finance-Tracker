import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'
import { projectAuth } from '../components/firebase/config'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)


            if (!res.user) {
                throw new Error('User data is unavailable.')
            }

            dispatch({ type: 'LOGIN', payload: res.user })
        } catch (err) {
            console.error(err.message)
            setError(err.message)
        } finally {
            setIsPending(false)
        }
    }


    return { login, error, isPending }
}
