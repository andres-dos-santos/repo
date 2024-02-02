import { useContext } from 'react'

import { SessionContext } from '../contexts/session'

export function useSession() {
  const {
    signIn,
    signOut,
    user,
    signUp,
    setUser,
    initialRouteName,
    checkEmail,
  } = useContext(SessionContext)

  return {
    signIn,
    signOut,
    user,
    signUp,
    setUser,
    initialRouteName,
    checkEmail,
  }
}
