import { useState } from 'react'
import { FlatList, Pressable, View } from 'react-native'
import { Pencil, Plus, Trash2 } from 'lucide-react-native'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { EmptyState } from '@/components/ui/EmptyState'
import { ScreenHeader } from '@/components/ui/ScreenHeader'
import { Spinner } from '@/components/ui/Spinner'
import { useProviderServices } from '../hooks/useProviderServices'
import { ServiceCard } from './ServiceCard'
import { ServiceFormSheet } from './ServiceFormSheet'
import type { ServiceSheetTarget } from './ServiceFormSheet'
import type { Service } from '@/types'

export function ProviderServices() {
  const { services, isLoading, errorMessage, remove, isRemoving } = useProviderServices()
  const [formTarget, setFormTarget] = useState<ServiceSheetTarget>(undefined)
  const [toDelete, setToDelete] = useState<Service | null>(null)

  const newButton = <Button title="Novo" className="h-10 px-4" onPress={() => setFormTarget(null)} rightIcon={<Plus size={16} strokeWidth={1.5} color="#0B192C" />} />

  return (
    <View className="flex-1">
      <FlatList
        data={services}
        keyExtractor={(service) => service.id}
        contentContainerClassName="gap-3 p-5"
        ListHeaderComponent={
          <View className="mb-2 gap-4">
            <ScreenHeader title="Meus serviços" description="Publica o que sabes fazer e define o teu preço." action={services.length > 0 ? newButton : undefined} />
            {errorMessage ? <Alert message={errorMessage} /> : null}
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <Spinner />
          ) : (
            <EmptyState
              image={require('../../../../assets/images/enthusiastic.svg')}
              title="Publica o teu primeiro serviço"
              description="Os clientes encontram-te pelo que ofereces. Começa em menos de um minuto."
              action={newButton}
            />
          )
        }
        renderItem={({ item }) => (
          <ServiceCard
            service={item}
            showProvider={false}
            action={
              <View className="flex-row gap-1">
                <Pressable onPress={() => setFormTarget(item)} accessibilityRole="button" accessibilityLabel={`Editar ${item.name}`} hitSlop={6} className="p-2">
                  <Pencil size={18} strokeWidth={1.5} color="#64748B" />
                </Pressable>
                <Pressable onPress={() => setToDelete(item)} accessibilityRole="button" accessibilityLabel={`Remover ${item.name}`} hitSlop={6} className="p-2">
                  <Trash2 size={18} strokeWidth={1.5} color="#DC2626" />
                </Pressable>
              </View>
            }
          />
        )}
      />

      <ServiceFormSheet target={formTarget} onClose={() => setFormTarget(undefined)} />
      <ConfirmDialog
        visible={toDelete !== null}
        danger
        title="Remover serviço?"
        description={`"${toDelete?.name ?? ''}" deixará de aparecer para os clientes.`}
        confirmLabel="Remover"
        isLoading={isRemoving}
        onClose={() => setToDelete(null)}
        onConfirm={async () => {
          if (toDelete) await remove(toDelete)
          setToDelete(null)
        }}
      />
    </View>
  )
}
