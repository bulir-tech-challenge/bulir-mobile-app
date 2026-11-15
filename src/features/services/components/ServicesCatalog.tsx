import { useState } from 'react'
import { FlatList, View } from 'react-native'
import { Search } from 'lucide-react-native'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Input } from '@/components/ui/Input'
import { ScreenHeader } from '@/components/ui/ScreenHeader'
import { Spinner } from '@/components/ui/Spinner'
import { useServices } from '@/hooks/useServices'
import { useWallet } from '@/hooks/useWallet'
import { toErrorMessage } from '@/lib/errors'
import { useServiceSearch } from '../hooks/useServiceSearch'
import { BookServiceSheet } from './BookServiceSheet'
import { ServiceCard } from './ServiceCard'
import type { Service } from '@/types'

export function ServicesCatalog() {
  const { services, isLoadingServices, servicesError, refetchServices } = useServices()
  const { balance } = useWallet()
  const { query, setQuery, results } = useServiceSearch(services)
  const [selected, setSelected] = useState<Service | null>(null)

  return (
    <View className="flex-1">
      <FlatList
        data={results}
        keyExtractor={(service) => service.id}
        contentContainerClassName="gap-3 p-5"
        keyboardShouldPersistTaps="handled"
        onRefresh={() => void refetchServices()}
        refreshing={false}
        ListHeaderComponent={
          <View className="mb-2 gap-4">
            <ScreenHeader title="Explorar serviços" description="Encontra o prestador certo e reserva com o teu saldo." />
            <Input
              value={query}
              onChangeText={setQuery}
              placeholder="Pesquisar por serviço ou prestador"
              accessibilityLabel="Pesquisar serviços"
              leftIcon={<Search size={18} strokeWidth={1.5} color="#94A3B8" />}
            />
            {servicesError ? <Alert message={toErrorMessage(servicesError, 'Não foi possível carregar os serviços') ?? ''} /> : null}
          </View>
        }
        ListEmptyComponent={
          isLoadingServices ? (
            <Spinner />
          ) : (
            <EmptyState
              image={require('../../../../assets/images/dropshipping.svg')}
              title={query ? 'Nenhum serviço encontrado' : 'Ainda não há serviços'}
              description={query ? 'Tenta outra palavra-chave.' : 'Volta mais tarde: os prestadores estão a publicar novos serviços.'}
            />
          )
        }
        renderItem={({ item }) => (
          <ServiceCard service={item} action={<Button title="Reservar" className="h-10 px-5" onPress={() => setSelected(item)} />} />
        )}
      />
      <BookServiceSheet service={selected} balance={balance} onClose={() => setSelected(null)} />
    </View>
  )
}
