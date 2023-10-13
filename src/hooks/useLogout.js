import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'
import { projectAuth } from '../components/firebase/config'



export const useLogout = () => {
    const [isCanceled, setIsCanceled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        // sign the user out

        try {
            await projectAuth.signOut()

            //dispatch logout action

            dispatch({ type: 'LOGOUT' })
            //update state
            if (!isCanceled) {
                setIsPending(false)
                setError(null)
            }

        } catch (err) {
            if (!isCanceled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }
    useEffect(() => {
        return () => setIsCanceled(true)
    }, [])
    return { logout, error, isPending }
}