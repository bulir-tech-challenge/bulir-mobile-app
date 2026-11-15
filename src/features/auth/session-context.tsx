import { createContext, use, useCallback, useEffect, useMemo, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { sessionStorage } from '@/lib/session-storage'
import { onUnauthorized, setAuthToken } from '@/services/api'

interface SessionContextValue {
  /** `true` enquanto o token guardado ainda está a ser lido no arranque. */
  isLoading: boolean
  token: string | null
  signIn: (token: string) => Promise<void>
  signOut: () => Promise<void>
}

const SessionContext = createContext<SessionContextValue | null>(null)

export function useSession(): SessionContextValue {
  const value = use(SessionContext)
  if (!value) throw new Error('useSession deve ser usado dentro de <SessionProvider>')
  return value
}

/** Guarda o JWT (memória + armazenamento seguro) e reage a sessões expiradas. */
export function SessionProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient()
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    sessionStorage.getToken().then((stored) => {
      setAuthToken(stored)
      setToken(stored)
      setIsLoading(false)
    })
  }, [])

  const signIn = useCallback(async (next: string) => {
    setAuthToken(next)
    setToken(next)
    await sessionStorage.setToken(next)
  }, [])

  const signOut = useCallback(async () => {
    setAuthToken(null)
    setToken(null)
    queryClient.clear()
    await sessionStorage.setToken(null)
  }, [queryClient])

  // Token expirado/inválido (401): termina a sessão e o guarda de rotas leva ao login.
  useEffect(() => {
    onUnauthorized(() => void signOut())
    return () => onUnauthorized(null)
  }, [signOut])

  const value = useMemo(() => ({ isLoading, token, signIn, signOut }), [isLoading, token, signIn, signOut])

  return <SessionContext value={value}>{children}</SessionContext>
}
