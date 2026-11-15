import { Text, View } from 'react-native'
import { getInitials } from '@/lib/format'

export function Avatar({ name, size = 44 }: { name: string; size?: number }) {
  return (
    <View
      accessibilityLabel={name}
      style={{ width: size, height: size, borderRadius: size / 3.2 }}
      className="items-center justify-center bg-primary"
    >
      <Text style={{ fontSize: size * 0.36 }} className="font-display text-navy-900">
        {getInitials(name)}
      </Text>
    </View>
  )
}
