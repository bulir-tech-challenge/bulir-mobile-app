import { Text, View } from 'react-native'
import { AlertCircle } from 'lucide-react-native'

export function Alert({ message }: { message: string }) {
  return (
    <View accessibilityRole="alert" className="flex-row items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
      <AlertCircle size={18} strokeWidth={1.5} color="#DC2626" />
      <Text className="flex-1 text-sm text-red-600">{message}</Text>
    </View>
  )
}
