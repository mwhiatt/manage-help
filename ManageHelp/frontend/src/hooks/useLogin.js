import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [isSending, setIsSending] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    setIsSending(null)

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage so that they aren't logged out if they close browser
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context with authContext hook
      dispatch({type: 'LOGIN', payload: json})
      setIsLoading(false) //since we are done
    }
  }

  const resetPass = async (email) => {
    setIsLoading(true)
    setError(null)
    setIsSending("Email Sent")

    const response = await fetch('/api/user/resetpassword', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      setIsLoading(false) //since we are done
    }
  }

  return { login, resetPass, isLoading, error, isSending }
}