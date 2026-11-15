import { Text, View } from 'react-native'

type Tone = 'success' | 'danger' | 'neutral'

const box: Record<Tone, string> = { success: 'bg-primary/15', danger: 'bg-red-50', neutral: 'bg-navy-900/5' }
const text: Record<Tone, string> = { success: 'text-primary-deep', danger: 'text-red-600', neutral: 'text-text-muted' }

export function Badge({ tone = 'neutral', children }: { tone?: Tone; children: string }) {
  return (
    <View className={`self-start rounded-full px-2.5 py-0.5 ${box[tone]}`}>
      <Text className={`text-xs font-medium ${text[tone]}`}>{children}</Text>
    </View>
  )
}
