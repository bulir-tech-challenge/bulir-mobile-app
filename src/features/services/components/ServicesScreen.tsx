import { Spinner } from '@/components/ui/Spinner'
import { useAuth } from '@/hooks/useAuth'
import { ProviderServices } from './ProviderServices'
import { ServicesCatalog } from './ServicesCatalog'

/** Mesma aba, duas visões: catálogo para clientes, gestão para prestadores. */
export function ServicesScreen() {
  const { user } = useAuth()
  if (!user) return <Spinner />
  return user.role === 'PROVIDER' ? <ProviderServices /> : <ServicesCatalog />
}
