import { Text, View } from 'react-native'
import { Button } from './Button'
import { Sheet } from './Sheet'

interface ConfirmDialogProps {
  visible: boolean
  title: string
  description: string
  confirmLabel: string
  isLoading?: boolean
  danger?: boolean
  onConfirm: () => void
  onClose: () => void
}

export function ConfirmDialog({ visible, title, description, confirmLabel, isLoading, danger, onConfirm, onClose }: ConfirmDialogProps) {
  return (
    <Sheet visible={visible} title={title} onClose={onClose}>
      <Text className="text-sm text-text-muted">{description}</Text>
      <View className="gap-2">
        <Button title={confirmLabel} variant={danger ? 'danger' : 'primary'} isLoading={isLoading} onPress={onConfirm} />
        <Button title="Voltar" variant="ghost" onPress={onClose} />
      </View>
    </Sheet>
  )
}
