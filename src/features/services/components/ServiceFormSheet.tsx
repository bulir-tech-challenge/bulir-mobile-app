import { View } from 'react-native'
import { Banknote } from 'lucide-react-native'
import { FormInput } from '@/components/form/FormInput'
import { FormNumberInput } from '@/components/form/FormNumberInput'
import { FormTextarea } from '@/components/form/FormTextarea'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { Sheet } from '@/components/ui/Sheet'
import { useServiceForm } from '../hooks/useServiceForm'
import type { Service } from '@/types'

/** `undefined` = fechado · `null` = novo serviço · `Service` = edição. */
export type ServiceSheetTarget = Service | null | undefined

function ServiceForm({ service, onClose }: { service: Service | null; onClose: () => void }) {
  const { control, onSubmit, isEditing, isSubmitting, errorMessage } = useServiceForm(service, onClose)

  return (
    <View className="gap-4">
      {errorMessage ? <Alert message={errorMessage} /> : null}
      <FormInput control={control} name="name" label="Título" placeholder="Ex.: Reparação de ar condicionado" />
      <FormTextarea control={control} name="description" label="Descrição" placeholder="Explica o que está incluído no serviço" />
      <FormNumberInput control={control} name="price" label="Preço (Kz)" placeholder="0,00" leftIcon={<Banknote size={18} strokeWidth={1.5} color="#94A3B8" />} />
      <Button title={isEditing ? 'Guardar alterações' : 'Publicar serviço'} isLoading={isSubmitting} onPress={onSubmit} />
      <Button title="Cancelar" variant="ghost" onPress={onClose} />
    </View>
  )
}

export function ServiceFormSheet({ target, onClose }: { target: ServiceSheetTarget; onClose: () => void }) {
  return (
    <Sheet visible={target !== undefined} title={target ? 'Editar serviço' : 'Novo serviço'} onClose={onClose}>
      {target !== undefined ? <ServiceForm service={target} onClose={onClose} /> : null}
    </Sheet>
  )
}
