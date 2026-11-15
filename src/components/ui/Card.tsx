import { View } from 'react-native'
import type { ViewProps } from 'react-native'

export function Card({ className = '', ...rest }: ViewProps & { className?: string }) {
  return <View className={`rounded-2xl border border-slate-100 bg-white p-4 ${className}`} {...rest} />
}
