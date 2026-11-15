import { Redirect } from 'expo-router'
import { useSession } from '@/features/auth/session-context'

/** Rota "/": envia para o início (com sessão) ou para o login (sem sessão). */
export default function Index() {
  const { token } = useSession()
  return <Redirect href={token ? '/home' : '/login'} />
}
