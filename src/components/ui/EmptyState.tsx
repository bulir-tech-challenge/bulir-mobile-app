import type { ReactNode } from 'react'
import { Text, View } from 'react-native'
import { Image } from 'expo-image'
import type { ImageSource } from 'expo-image'

interface EmptyStateProps {
  image?: ImageSource | number
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ image, title, description, action }: EmptyStateProps) {
  return (
    <View className="items-center gap-3 px-6 py-10">
      {image ? <Image source={image} style={{ width: 160, height: 160 }} contentFit="contain" /> : null}
      <Text className="text-center font-display text-lg text-navy-900">{title}</Text>
      {description ? <Text className="text-center text-sm text-text-muted">{description}</Text> : null}
      {action}
    </View>
  )
}
